import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedBlogPosts, formatBlogDate, topicToSlug } from '@/lib/blog';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/site.config';

type BlogSearchParams = Promise<{
  q?: string | string[];
  tema?: string | string[];
  razeni?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

export async function generateMetadata({ searchParams }: { searchParams: BlogSearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const hasFilters = Boolean(firstValue(params.q) || firstValue(params.tema) || firstValue(params.razeni));
  return hasFilters ? { robots: { index: false, follow: true } } : {};
}

export default async function BlogPage({ searchParams }: { searchParams: BlogSearchParams }) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const selectedTopic = firstValue(params.tema);
  const sort = firstValue(params.razeni) === 'asc' ? 'asc' : 'desc';
  const allPosts = getPublishedBlogPosts();
  const topics = [...new Set(allPosts.flatMap((post) => post.topics))].sort((a, b) => a.localeCompare(b, 'cs'));
  const normalizedQuery = query.toLocaleLowerCase('cs');

  const posts = allPosts
    .filter((post) => !selectedTopic || post.topics.some((topic) => topicToSlug(topic) === selectedTopic))
    .filter((post) => {
      if (!normalizedQuery) return true;
      return [post.title, post.excerpt, ...post.topics, ...post.keywords]
        .join(' ')
        .toLocaleLowerCase('cs')
        .includes(normalizedQuery);
    })
    .sort((a, b) => {
      const difference = Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      return sort === 'asc' ? difference : -difference;
    });

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: 'Blog – Petr Vurm',
        description: 'Články Petra Vurma o webovém vývoji, programování a technologiích.',
        inLanguage: 'cs-CZ',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        blogPost: allPosts.map((post) => ({ '@id': `${SITE_URL}/blog/${post.slug}#article` })),
        breadcrumb: { '@id': `${SITE_URL}/blog#breadcrumb` },
      },
      {
        ...breadcrumbJsonLd([
          { name: 'Petr Vurm', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
        '@id': `${SITE_URL}/blog#breadcrumb`,
      },
    ],
  };

  return (
    <section className="py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }} />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
          <p className="mt-4 leading-7 text-white/70">Články o webovém vývoji, programování a technologiích.</p>
        </header>

        {allPosts.length > 0 ? (
          <>
        <form action="/blog" method="get" className="mt-10 grid gap-4 border-y border-white/10 py-5 md:grid-cols-[minmax(0,1fr)_220px_190px_auto] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Hledat</span>
            <input name="q" type="search" defaultValue={query} placeholder="Titulek, perex nebo klíčové slovo" className="h-10 w-full rounded-md border border-white/15 bg-black/20 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-primary" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Téma</span>
            <select name="tema" defaultValue={selectedTopic} className="h-10 w-full rounded-md border border-white/15 bg-[#111113] px-3 text-sm text-white outline-none focus:border-primary">
              <option value="">Všechna témata</option>
              {topics.map((topic) => <option key={topic} value={topicToSlug(topic)}>{topic}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Řazení</span>
            <select name="razeni" defaultValue={sort} className="h-10 w-full rounded-md border border-white/15 bg-[#111113] px-3 text-sm text-white outline-none focus:border-primary">
              <option value="desc">Od nejnovějších</option>
              <option value="asc">Od nejstarších</option>
            </select>
          </label>
          <div className="flex gap-3">
            <button type="submit" className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-black transition hover:bg-primary/90">Použít</button>
            {(query || selectedTopic || sort === 'asc') && <Link href="/blog" className="inline-flex h-10 items-center px-2 text-sm text-white/60 hover:text-white">Zrušit</Link>}
          </div>
        </form>

        <p className="mt-6 text-sm text-white/50" aria-live="polite">
          {posts.length === 1 ? 'Nalezen 1 článek' : `Nalezeno ${posts.length} článků`}
        </p>

        {posts.length > 0 ? (
          <div className="mt-6 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {posts.map((post, index) => (
              <article key={post.slug}>
                {post.image && (
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Image src={post.image} alt={post.imageAlt} width={900} height={506} className="aspect-video w-full rounded-lg border border-white/10 object-cover" priority={index < 2} sizes="(min-width: 768px) 50vw, 100vw" unoptimized={/^https?:\/\//i.test(post.image)} />
                  </Link>
                )}
                <div className={post.image ? 'mt-5' : ''}>
                  <div className="flex flex-wrap items-center gap-x-2 text-sm text-white/50">
                    <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                    {post.topics.length > 0 && <span aria-hidden="true">·</span>}
                    {post.topics.map((topic, topicIndex) => (
                      <span key={topic}>
                        <Link href={`/blog?tema=${encodeURIComponent(topicToSlug(topic))}`} className="text-white/60 hover:text-primary">{topic}</Link>
                        {topicIndex < post.topics.length - 1 && <span className="ml-2" aria-hidden="true">·</span>}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm text-primary hover:underline">Přečíst článek</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 border-t border-white/10 py-8 text-white/60">
            Žádné články neodpovídají zvoleným filtrům.
          </p>
        )}
          </>
        ) : (
          <p className="mt-10 border-t border-white/10 py-8 text-white/60">
            Zatím tu není žádný publikovaný článek.
          </p>
        )}
      </div>
    </section>
  );
}
