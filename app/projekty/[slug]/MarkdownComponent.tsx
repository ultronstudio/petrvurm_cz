import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { Marked, Renderer } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter } from "shiki";
import React from "react";

export default async function MarkdownComponent({ content }: { content: string }) {
  const highlighter = await createHighlighter({
    langs: ["md", "js", "php", "css", "ts", "html", "python", "blade", "json", "java"],
    themes: ["github-dark-dimmed"],
  });

  const renderer = new Renderer();

  // odkazy ven = new tab
  renderer.link = function ({ href, title, tokens }) {
    const text = tokens.map((t) => t.raw).join("");
    try {
      new URL(href);
      return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title || ""}">${text}</a>`;
    } catch {
      return `<a href="${href}" title="${title || ""}">${text}</a>`;
    }
  };

  // nadpisy s id (pro případné anchorování)
  const origHeading = renderer.heading!.bind(renderer);
  renderer.heading = function (token) {
    const slug = token.text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
    return `<h${token.depth} id="${slug}">${token.text}</h${token.depth}>`;
  };

  const html = await new Marked()
    .use(
      markedShiki({
        highlight(code, lang, props) {
          return highlighter.codeToHtml(code, {
            lang,
            theme: "github-dark-dimmed",
            meta: { __raw: props.join(" ") },
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerNotationErrorLevel(),
              transformerMetaHighlight(),
              transformerMetaWordHighlight(),
            ],
          });
        },
      })
    )
    .setOptions({ renderer })
    .parse(content);

  return (
    <div
      className="
        markdown-body
        prose prose-invert max-w-none
        prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10
        prose-pre:bg-[#0f1115] prose-code:before:content-[''] prose-code:after:content-['']
        prose-a:text-primary hover:prose-a:underline
        prose-h2:mt-8 prose-h2:scroll-mt-24
        prose-img:rounded-xl
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
