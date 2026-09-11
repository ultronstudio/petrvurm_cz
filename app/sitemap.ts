import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';
import { getAllCities, SITE_URL, STATIC_ROUTES } from '@/site.config';

async function getIndexableProjectSlugs(): Promise<string[]> {
  try {
    const directory = path.join(process.cwd(), 'projekty');
    const files = await fs.readdir(directory);
    const slugs: string[] = [];

    for (const file of files.filter((item) => item.endsWith('.md'))) {
      const source = await fs.readFile(path.join(directory, file), 'utf8');
      const { data } = matter(source);
      if (data.index === false) continue;
      slugs.push(file.replace(/\.md$/, ''));
    }

    return slugs;
  } catch {
    return [];
  }
}

function getSitemapMeta(route: string): Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'> {
  if (route === '/') return { changeFrequency: 'weekly', priority: 1 };
  if (route === '/projekty') return { changeFrequency: 'monthly', priority: 0.9 };
  if (route.startsWith('/projekty/')) return { changeFrequency: 'monthly', priority: 0.8 };
  if (route === '/cenik' || route === '/kontakt' || route === '/o-mne') return { changeFrequency: 'monthly', priority: 0.8 };
  if (route === '/gdpr' || route === '/obchodni-podminky') return { changeFrequency: 'yearly', priority: 0.3 };
  if (route.startsWith('/it-servis/')) return { changeFrequency: 'monthly', priority: 0.5 };
  return { changeFrequency: 'monthly', priority: 0.7 };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getIndexableProjectSlugs();
  const routes = [
    ...STATIC_ROUTES,
    ...projectSlugs.map((slug) => `/projekty/${slug}`),
    ...getAllCities().map((city) => `/it-servis/${city.slug}`),
  ];

  return [...new Set(routes)].map((route) => ({
    url: `${SITE_URL}${route}`,
    ...getSitemapMeta(route),
  }));
}
