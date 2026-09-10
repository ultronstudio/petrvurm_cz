import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MarkdownComponent from '@/app/projekty/[slug]/MarkdownComponent';
import { SITE_URL } from '@/site.config';

const postsDirectory = path.join(process.cwd(), 'projekty');

type PostData = {
  data: {
    title: string;
    description: string;
    previewImage: string;
    created: string;
    updated: string;
    status: string;
    licence: string;
  };
  content: string;
};

function getPostData(slug: string): PostData | null {
  try {
    const fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), 'utf8');
    const { data, content } = matter(fileContents);
    return {
      data: {
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        previewImage: String(data.previewImage ?? ''),
        created: String(data.created ?? ''),
        updated: String(data.updated ?? ''),
        status: String(data.status ?? ''),
        licence: String(data.licence ?? ''),
      },
      content,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: 'Projekt nenalezen', robots: { index: false, follow: false } };

  const url = `${SITE_URL}/projekty/${slug}`;
  return {
    title: post.data.title,
    description: post.data.description || 'Projekt Petra Vurma',
    alternates: { canonical: url },
    openGraph: {
      title: `${post.data.title} – Petr Vurm`,
      description: post.data.description,
      url,
      type: 'article',
      images: post.data.previewImage ? [{ url: post.data.previewImage, alt: `Náhled projektu ${post.data.title}` }] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) notFound();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <nav className="mb-6 text-sm text-white/55" aria-label="Drobečková navigace">
          <Link href="/projekty" className="hover:text-primary">Projekty</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span className="text-white/80">{post.data.title}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            {post.data.previewImage ? (
              <Image src={post.data.previewImage} alt={`Náhled projektu ${post.data.title}`} width={1000} height={625} className="aspect-video w-full rounded-lg border border-white/10 object-cover" priority sizes="(min-width: 768px) 60vw, 100vw" />
            ) : (
              <div className="flex aspect-video items-center justify-center border border-white/10 text-white/50">Bez náhledu</div>
            )}
          </div>

          <header>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{post.data.title}</h1>
            {post.data.description && <p className="mt-4 leading-7 text-white/70">{post.data.description}</p>}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5 text-sm">
              {post.data.created && <div><dt className="text-white/45">Vytvořeno</dt><dd className="mt-1 text-white/80">{post.data.created}</dd></div>}
              {post.data.updated && <div><dt className="text-white/45">Aktualizováno</dt><dd className="mt-1 text-white/80">{post.data.updated}</dd></div>}
              {post.data.status && <div><dt className="text-white/45">Stav</dt><dd className="mt-1 text-white/80">{post.data.status}</dd></div>}
              {post.data.licence && <div><dt className="text-white/45">Licence</dt><dd className="mt-1 text-white/80">{post.data.licence}</dd></div>}
            </dl>
          </header>
        </div>

        <article className="mt-10 max-w-3xl border-t border-white/10 pt-8">
          <MarkdownComponent content={post.content} />
        </article>
      </div>
    </section>
  );
}
