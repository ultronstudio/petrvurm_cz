import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MarkdownComponent from "@/app/projekty/[slug]/MarkdownComponent";
import Link from "next/link";

const postsDirectory = path.join(process.cwd(), "projekty");

export interface PostData {
  filename: string;
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
}

function readTimeMinutes(text: string, wpm = 200) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wpm));
}

async function getPostData(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      filename: `${slug}.md`,
      data: {
        title: data.title || "",
        description: data.description || "",
        previewImage: data.previewImage || "",
        created: data.created || "",
        updated: data.updated || "",
        status: data.status || "",
        licence: data.licence || "",
      },
      content,
    } as PostData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostData(slug);

  if (!post) return notFound();

  const rt = readTimeMinutes(post.content);

  return (
    <section className="relative py-12">
      {/* soft gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%),linear-gradient(180deg,#0B0C0E_0%,#0A0A0C_100%)]" />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* breadcrumb */}
        <div className="mb-4 text-sm text-white/60">
          <Link href="/projekty" prefetch={false} className="hover:text-white">
            Projekty
          </Link>{" "}
          / <span className="text-white">{post.data.title}</span>
        </div>

        {/* hero */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {post.data.previewImage ? (
              <img
                src={post.data.previewImage}
                alt={post.data.title}
                className="h-full w-full aspect-video object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center text-white/50">
                Bez náhledu
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.data.title}
            </h1>
            {/* popis může obsahovat HTML */}
            {post.data.description && (
              <p
                className="mt-3 text-white/80"
                dangerouslySetInnerHTML={{ __html: post.data.description }}
              />
            )}

            {/* meta chips */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">Projekt vytvořen</div>
                <div className="text-sm font-semibold">{post.data.created}</div>
              </div>

              {post.data.updated && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">Naposledy upraven</div>
                  <div className="text-sm font-semibold">{post.data.updated}</div>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">Stav vývoje</div>
                <div
                  className="text-sm font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.data.status }}
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">Licence</div>
                <div className="text-sm font-semibold">{post.data.licence || "—"}</div>
              </div>
            </div>

            {/* reading time */}
            <div className="mt-4 text-xs text-white/60">
              Odhad doby čtení: <span className="text-white">{rt} min</span>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-3">O projektu</h2>
          <MarkdownComponent content={post.content} />
        </div>
      </div>
    </section>
  );
}
