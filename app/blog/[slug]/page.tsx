import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { formatBlogDate, getBlogPost, getPublishedBlogPosts, topicToSlug } from '@/lib/blog';
import { PERSON_ID, WEBSITE_ID, absoluteUrl, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/site.config';

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Článek nenalezen', robots: { index: false, follow: false } };

  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.image ? absoluteUrl(post.image) : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: 'Petr Vurm', url: `${SITE_URL}/o-mne` }],
    creator: 'Petr Vurm',
    alternates: { canonical: url },
    robots: post.index ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${post.title} – Petr Vurm`,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? undefined,
      authors: [`${SITE_URL}/o-mne`],
      tags: post.topics,
      images: image ? [{ url: image, alt: post.imageAlt }] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: `${post.title} – Petr Vurm`,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleId = `${url}#article`;
  const blogPostJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: `${post.title} – Petr Vurm`,
        description: post.excerpt,
        inLanguage: 'cs-CZ',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        mainEntity: { '@id': articleId },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BlogPosting',
        '@id': articleId,
        url,
        headline: post.title,
        description: post.excerpt,
        image: post.image ? absoluteUrl(post.image) : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        keywords: post.keywords.join(', '),
        articleSection: post.topics,
        inLanguage: 'cs-CZ',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        mainEntityOfPage: { '@id': `${url}#page` },
      },
      {
        ...breadcrumbJsonLd([
          { name: 'Petr Vurm', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
        '@id': `${url}#breadcrumb`,
      },
    ],
  };

  return (
    <section className="py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostJsonLd) }} />
      <article className="container mx-auto max-w-4xl px-4 md:px-6">
        <nav className="mb-8 text-sm text-white/50" aria-label="Drobečková navigace">
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span className="text-white/80">{post.title}</span>
        </nav>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
            <span>Publikováno <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></span>
            {post.updatedAt && <span>Upraveno <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time></span>}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/70">{post.excerpt}</p>
          {post.topics.length > 0 && (
            <p className="mt-5 text-sm text-white/50">
              <span className="text-white/70">Témata:</span>{' '}
              {post.topics.map((topic, index) => (
                <span key={topic}>
                  <Link href={`/blog?tema=${encodeURIComponent(topicToSlug(topic))}`} className="hover:text-primary">{topic}</Link>
                  {index < post.topics.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          )}
        </header>

        {post.image && (
          <Image src={post.image} alt={post.imageAlt} width={1200} height={675} className="mt-10 aspect-video w-full rounded-lg border border-white/10 object-cover" priority sizes="(min-width: 896px) 896px, 100vw" unoptimized={/^https?:\/\//i.test(post.image)} />
        )}

        <div className="mt-10 max-w-3xl border-t border-white/10 pt-8">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </section>
  );
}
