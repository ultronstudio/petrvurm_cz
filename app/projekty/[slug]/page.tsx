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
    openGraph: { title: `${post.data.title} – Petr Vurm`, description: post.data.description, url, type: 'article', images: post.data.previewImage ? [{ url: post.data.previewImage, alt: `Náhled projektu ${post.data.title}` }] : [] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) notFound();

  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <nav className="mb-5 text-sm text-white/60" aria-label="Drobečková navigace"><Link href="/projekty" className="hover:text-primary">Projekty</Link> <span aria-hidden="true">/</span> <span className="text-white">{post.data.title}</span></nav>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {post.data.previewImage ? <Image src={post.data.previewImage} alt={`Náhled projektu ${post.data.title}`} width={800} height={500} className="aspect-video h-full w-full object-cover" priority sizes="(min-width: 768px) 50vw, 100vw" /> : <div className="flex aspect-video items-center justify-center text-white/50">Bez náhledu</div>}
          </div>
          <header className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{post.data.title}</h1>
            {post.data.description && <p className="mt-4 leading-7 text-white/75">{post.data.description}</p>}
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {post.data.created && <div className="rounded-xl border border-white/10 p-3"><dt className="text-white/55">Vytvořeno</dt><dd className="mt-1 font-semibold">{post.data.created}</dd></div>}
              {post.data.updated && <div className="rounded-xl border border-white/10 p-3"><dt className="text-white/55">Aktualizováno</dt><dd className="mt-1 font-semibold">{post.data.updated}</dd></div>}
              {post.data.status && <div className="rounded-xl border border-white/10 p-3"><dt className="text-white/55">Stav</dt><dd className="mt-1 font-semibold">{post.data.status}</dd></div>}
              {post.data.licence && <div className="rounded-xl border border-white/10 p-3"><dt className="text-white/55">Licence</dt><dd className="mt-1 font-semibold">{post.data.licence}</dd></div>}
            </dl>
          </header>
        </div>
        <article className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"><MarkdownComponent content={post.content} /></article>
      </div>
    </section>
  );
}
