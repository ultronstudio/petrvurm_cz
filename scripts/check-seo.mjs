const baseUrl = new URL(process.argv[2] ?? process.env.SEO_BASE_URL ?? 'http://localhost:8001');

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = '';
  url.search = '';

  if (url.pathname !== '/') {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }

  return url.href;
}

function getCanonicalUrls(html) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  return linkTags
    .filter((tag) => /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag))
    .map((tag) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter(Boolean)
    .map((href) => href.replaceAll('&amp;', '&'));
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'petrvurm.cz SEO canonical check' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.text();
}

const sitemapUrl = new URL('/sitemap.xml', baseUrl);
const sitemap = await fetchText(sitemapUrl);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);

if (sitemapUrls.length === 0) {
  throw new Error(`${sitemapUrl} does not contain any page URLs`);
}

const errors = [];

await Promise.all(
  sitemapUrls.map(async (sitemapEntry) => {
    const publicUrl = new URL(sitemapEntry);
    const pageUrl = new URL(`${publicUrl.pathname}${publicUrl.search}`, baseUrl);

    try {
      const html = await fetchText(pageUrl);
      const canonicals = getCanonicalUrls(html);

      if (canonicals.length !== 1) {
        errors.push(`${publicUrl}: expected one canonical link, found ${canonicals.length}`);
        return;
      }

      const expected = normalizeUrl(publicUrl);
      const actual = normalizeUrl(new URL(canonicals[0], publicUrl));

      if (actual !== expected) {
        errors.push(`${publicUrl}: canonical is ${actual}, expected ${expected}`);
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }),
);

if (errors.length > 0) {
  console.error(`SEO canonical check failed for ${errors.length} of ${sitemapUrls.length} URLs:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`SEO canonical check passed for all ${sitemapUrls.length} sitemap URLs.`);
}
