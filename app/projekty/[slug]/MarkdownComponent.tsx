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

export default async function MarkdownComponent({
    content,
  }: {
    content: string;
  }) {
    const highlighter = await createHighlighter({
      langs: ["md", "js", "php", "css", "ts", "html", "python", "blade", "json", "java"],
      themes: ["github-dark-dimmed"],
    });
  
    const renderer = new Renderer();
  
    renderer.link = function ({ href, title, tokens }) {
      const text = tokens.map((token) => token.raw).join("");
  
      try {
        new URL(href);
      } catch {
        return `<a href="${href}" title="${title || ""}">${text}</a>`;
      }
  
      return `<a target="_blank" href="${href}" title="${title || ""}">${text}</a>`;
    };
  
    const contentHtml = await new Marked()
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
                transformerMetaWordHighlight()
              ],
            });
          },
        }),
      )
      .setOptions({ renderer })
      .parse(content);
  
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      ></div>
    );
  }