import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MarkdownComponent from "@/app/projekty/[slug]/MarkdownComponent";

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
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const content = await getPostData(slug);

  if (content == null) {
    return notFound();
  }

  return (
    <section id="services" className="py-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-[100%] max-w-[100%] md:w-[50%] md:max-w-[50%]">
            <img
              src={`${content.data.previewImage}`}
              alt={content.data.title}
              className="w-full aspect-video max-h-[720px] object-cover rounded-lg"
            />
          </div>
          <div className="w-[100%] max-w-[100%] md:w-[50%] md:max-w-[50%]">
            <h2 className="text-4xl">
              <strong>{content.data.title}</strong>
            </h2>
            <p
              className="text-gray-400 mt-1 text-1xl"
              dangerouslySetInnerHTML={{ __html: content.data.description }}
            ></p>
            <div className="grid grid-cols-2 gap-4 p-5">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Projekt vytvořen
                </div>
                <div className="text-base font-bold">
                  {content.data.created}
                </div>
              </div>
              {content.data.updated && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Naposledy upraven
                  </div>
                  <div className="text-base font-bold">
                    {content.data.updated}
                  </div>
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Stav vývoje
                </div>
                <div
                  className="text-base font-bold"
                  dangerouslySetInnerHTML={{ __html: content.data.status }}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Licence projektu
                </div>
                <div className="text-base font-bold">
                  {content.data.licence}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-white text-3xl font-bold mt-6 mb-2">O projektu</h3>
        <MarkdownComponent content={content.content} />
      </div>
    </section>
  );
}
