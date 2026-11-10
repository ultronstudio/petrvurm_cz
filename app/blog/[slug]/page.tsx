import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import ArticleDate from '@/components/Blog/ArticleDate';
import ShareArticle from '@/components/Blog/ShareArticle';
import ArticleToc from '@/components/Blog/ArticleToc';
import { getBlogTableOfContents } from '@/lib/blog-headings';
import { formatBlogDateTime, getBlogPost, getPublishedBlogPosts, topicToSlug } from '@/lib/blog';
import { PERSON_ID, WEBSITE_ID, absoluteUrl, serializeJsonLd } from '@/lib/seo';
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
    title: { absolute: `${post.title} | Blog | Petr Vurm` },
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: 'Petr Vurm', url: `${SITE_URL}/o-mne` }],
    creator: 'Petr Vurm',
    alternates: { canonical: url },
    robots: post.index ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${post.title} | Blog | Petr Vurm`,
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
      title: `${post.title} | Blog | Petr Vurm`,
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
  const toc = getBlogTableOfContents(post.content);
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
      },
      {
        '@type': post.newsArticle ? ['BlogPosting', 'NewsArticle'] : 'BlogPosting',
        '@id': articleId,
        url,
        headline: post.title,
        description: post.excerpt,
        image: post.image ? {
          '@type': 'ImageObject',
          url: absoluteUrl(post.image),
          caption: post.imageCaption || undefined,
          creditText: post.imageCredit || undefined,
        } : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        keywords: post.keywords.join(', '),
        articleSection: post.topics,
        inLanguage: 'cs-CZ',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        mainEntityOfPage: { '@id': `${url}#page` },
      },
    ],
  };

  return (
    <section className="py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostJsonLd) }} />
      <article className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className={toc.length ? 'grid grid-cols-1 gap-x-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]' : 'mx-auto w-full lg:w-3/5'}>
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-3">
                <ArticleToc items={toc} />
              </div>
            </aside>
          )}
          <div className="min-w-0 w-full">
            {toc.length > 0 && (
              <details className="mb-8 rounded-md border border-white/15 p-4 lg:hidden">
                <summary className="cursor-pointer font-semibold text-white">Obsah článku</summary>
                <div className="mt-4">
                  <ArticleToc items={toc} showTitle={false} />
                </div>
              </details>
            )}
        <header className="w-full">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <Link href="/o-mne" rel="author" className="text-sm font-medium text-white/85 hover:text-primary">
              Petr Vurm
            </Link>
            <ShareArticle url={url} title={post.title} />
          </div>
        </header>

        {post.image && (
          <figure className="mt-8 w-full min-w-0">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={1200}
              height={675}
              className="block aspect-video h-auto w-full max-w-full rounded-md border border-white/10 object-cover"
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              unoptimized={/^https?:\/\//i.test(post.image)}
            />
            {(post.imageCaption || post.imageCredit) && (
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-xs leading-5 text-white/55">
                {post.imageCaption && <span>{post.imageCaption}</span>}
                {post.imageCredit && (
                  <span>
                    Foto:{' '}
                    {post.imageCreditUrl ? (
                      <a
                        href={post.imageCreditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-primary hover:underline"
                      >
                        {post.imageCredit}
                      </a>
                    ) : (
                      post.imageCredit
                    )}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        <div className="mt-7 w-full">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
            <ArticleDate value={post.publishedAt} fallback={formatBlogDateTime(post.publishedAt)} />
            {post.updatedAt && (
              <span>
                Aktualizováno <ArticleDate value={post.updatedAt} fallback={formatBlogDateTime(post.updatedAt)} />
              </span>
            )}
          </div>
          <p className="mt-5 text-lg leading-8 text-white/80">{post.excerpt}</p>
          {post.topics.length > 0 && (
            <p className="mt-5 text-sm leading-6 text-white/50">
              {post.topics.map((topic, index) => (
                <span key={topic}>
                  <Link href={'/blog?tema=' + encodeURIComponent(topicToSlug(topic))} className="hover:text-primary">
                    {topic}
                  </Link>
                  {index < post.topics.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="mt-9 w-full border-t border-white/10 pt-7">
          <MarkdownContent content={post.content} />
        </div>
        <div className="mt-10 w-full border-t border-white/10 pt-6">
          <ShareArticle url={url} title={post.title} />
        </div>
          </div>
        </div>
      </article>
    </section>
  );
}
