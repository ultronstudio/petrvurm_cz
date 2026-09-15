import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { Marked, Renderer } from 'marked';
import markedShiki from 'marked-shiki';
import { createHighlighter } from 'shiki';

const highlighterPromise = createHighlighter({
  langs: ['md', 'js', 'php', 'css', 'ts', 'html', 'python', 'blade', 'json', 'java'],
  themes: ['github-dark-dimmed'],
});

export default async function MarkdownContent({ content }: { content: string }) {
  const highlighter = await highlighterPromise;

  const renderer = new Renderer();

  renderer.link = function ({ href, title, tokens }) {
    const text = tokens.map((token) => token.raw).join('');
    try {
      new URL(href);
      return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title || ''}">${text}</a>`;
    } catch {
      return `<a href="${href}" title="${title || ''}">${text}</a>`;
    }
  };

  renderer.heading = function (token) {
    const slug = token.text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-');
    return `<h${token.depth} id="${slug}">${token.text}</h${token.depth}>`;
  };

  const html = await new Marked()
    .use(
      markedShiki({
        highlight(code, lang, props) {
          return highlighter.codeToHtml(code, {
            lang,
            theme: 'github-dark-dimmed',
            meta: { __raw: props.join(' ') },
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
      }),
    )
    .setOptions({ renderer })
    .parse(content);

  return <div className="markdown-body max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
