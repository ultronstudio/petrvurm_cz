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
import { getHeadingId } from '@/lib/blog-headings';

type BlogReference = {
  id: string;
  label: string;
  url: string;
  number: number;
  occurrences: number;
};

// Markdown footnotes: [^zdroj] in text and [^zdroj]: [Název](https://...) in definitions.
// Definitions are kept out of the article body and only actually cited references are rendered.
function extractBlogReferences(content: string): { body: string; references: Map<string, BlogReference> } {
  const references = new Map<string, BlogReference>();
  const body: string[] = [];
  const definition = /^\[\^([a-zA-Z0-9_-]+)\]:\s+\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*$/;

  for (const line of content.split(/\r?\n/)) {
    const match = definition.exec(line);
    if (!match) {
      if (/^\[\^[a-zA-Z0-9_-]+\]:/.test(line)) {
        throw new Error(`Neplatná definice reference: ${line}`);
      }
      body.push(line);
      continue;
    }
    const [, rawId, label, url] = match;
    const id = rawId.toLowerCase();
    if (references.has(id)) throw new Error(`Duplicitní reference: ${id}`);
    const parsedUrl = new URL(url);
    if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
      throw new Error(`Reference ${id}: nepovolený protokol URL.`);
    }
    references.set(id, { id, label, url: parsedUrl.href, number: 0, occurrences: 0 });
  }

  return { body: body.join('\n').trim(), references };
}

function escapeReferenceHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char] ?? char);
}


const highlighterPromise = createHighlighter({
  langs: ['md', 'js', 'php', 'css', 'ts', 'html', 'python', 'blade', 'json', 'java'],
  themes: ['github-dark-dimmed'],
});

export default async function MarkdownContent({ content }: { content: string }) {
  const highlighter = await highlighterPromise;
  const { body, references } = extractBlogReferences(content);
  const cited: BlogReference[] = [];
  const headingIds = new Map<string, number>();

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
    const slug = getHeadingId(token.text, headingIds);
    return `<h${token.depth} id="${slug}">${token.text}</h${token.depth}>`;
  };

  const html = await new Marked()
    .use({
      extensions: [{
        name: 'blogReference',
        level: 'inline',
        start: (source) => source.indexOf('[^'),
        tokenizer(source) {
          const match = /^\[\^([a-zA-Z0-9_-]+)\]/.exec(source);
          if (!match) return undefined;
          const id = match[1].toLowerCase();
          const reference = references.get(id);
          if (!reference) throw new Error(`Reference ${id} nemá definici.`);
          if (!reference.number) {
            reference.number = cited.length + 1;
            cited.push(reference);
          }
          reference.occurrences += 1;
          return {
            type: 'blogReference',
            raw: match[0],
            number: reference.number,
            id,
            occurrence: reference.occurrences,
          };
        },
        renderer(token) {
          const id = String(token.id);
          const number = Number(token.number);
          const occurrence = Number(token.occurrence);
          return `<sup id="cite-${id}-${occurrence}" class="ml-0.5 text-xs"><a class="text-primary hover:underline" href="#ref-${id}" aria-label="Zdroj ${number}">[${number}]</a></sup>`;
        },
      }],
    })
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
    .parse(body);

  const referencesHtml = cited.length
    ? `<section class="mt-12 border-t border-white/10 pt-8" aria-labelledby="blog-reference-title">
      <h2 id="blog-reference-title">Zdroje a reference</h2>
      <ol class="mt-4 list-decimal space-y-3 pl-6">
      ${cited.map((ref) => `<li id="ref-${ref.id}">
        <a href="${escapeReferenceHtml(ref.url)}" target="_blank" rel="noopener noreferrer">${escapeReferenceHtml(ref.label)}</a>

      </li>`).join('')}
      </ol>
    </section>`
    : '';

  return <div className="markdown-body max-w-none" dangerouslySetInnerHTML={{ __html: html + referencesHtml }} />;
}
