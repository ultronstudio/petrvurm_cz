import { createElement, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { Marked } from 'marked';
import { createHighlighter, type BundledLanguage } from 'shiki';
import { getHeadingId } from '@/lib/blog-headings';

type MarkdownToken = {
  type: string;
  text?: string;
  raw?: string;
  depth?: number;
  href?: string;
  title?: string;
  lang?: string;
  tokens?: MarkdownToken[];
  items?: MarkdownToken[];
  ordered?: boolean;
  start?: number | string;
  task?: boolean;
  checked?: boolean;
  header?: MarkdownToken[];
  rows?: MarkdownToken[][];
  align?: (CSSProperties['textAlign'] | null)[];
};

type Reference = {
  id: string;
  label: string;
  url: string;
  number: number;
};

type RenderContext = {
  references: Map<string, Reference>;
  cited: Reference[];
  headings: Map<string, number>;
};

const highlighterPromise = createHighlighter({
  langs: ['md', 'js', 'php', 'css', 'ts', 'html', 'python', 'blade', 'json', 'java'],
  themes: ['github-dark-dimmed'],
});

type Highlighter = Awaited<typeof highlighterPromise>;

function validUrl(input: string): string | null {
  const url = input.trim();
  if (!url || /[\u0000-\u001f\u007f]/.test(url)) return null;
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return null;
  return url;
}

function readReference(line: string): Reference | null {
  const match = /^\[\^([a-zA-Z0-9_-]+)\]:\s+\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*$/.exec(line);
  if (!match) return null;
  const [, id, label, href] = match;
  const url = validUrl(href);
  if (!url) throw new Error('Neplatná URL zdroje: ' + id);
  return { id: id.toLowerCase(), label, url, number: 0 };
}

function readReferences(content: string) {
  const references = new Map<string, Reference>();
  const body: string[] = [];
  for (const line of content.split(/\r?\n/)) {
    const definition = readReference(line);
    if (!definition) {
      if (/^\[\^[a-zA-Z0-9_-]+\]:/.test(line)) throw new Error('Neplatná definice citace: ' + line);
      body.push(line);
      continue;
    }
    if (references.has(definition.id)) throw new Error('Duplicitní citace: ' + definition.id);
    references.set(definition.id, definition);
  }
  return { body: body.join('\n').trim(), references };
}

function renderCitation(id: string, ctx: RenderContext, key: string): ReactNode {
  const reference = ctx.references.get(id.toLowerCase());
  if (!reference) throw new Error('Chybí definice citace: ' + id);
  if (!reference.number) {
    reference.number = ctx.cited.length + 1;
    ctx.cited.push(reference);
  }
  return (
    <sup key={key} className="ml-0.5 text-xs">
      <a href={'#ref-' + reference.id} aria-label={'Zdroj ' + reference.number}>[{reference.number}]</a>
    </sup>
  );
}

function renderText(text: string, ctx: RenderContext, key: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[\^([a-zA-Z0-9_-]+)\]/g;
  let offset = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > offset) parts.push(text.slice(offset, index));
    parts.push(renderCitation(match[1], ctx, key + '-' + index));
    offset = index + match[0].length;
  }
  if (offset < text.length) parts.push(text.slice(offset));
  return parts;
}

function inlineChildren(token: MarkdownToken, ctx: RenderContext, key: string): ReactNode {
  return token.tokens?.length
    ? renderInline(token.tokens, ctx)
    : renderText(token.text ?? '', ctx, key);
}

function renderLink(token: MarkdownToken, ctx: RenderContext, key: string): ReactNode {
  const href = validUrl(token.href ?? '');
  const children = inlineChildren(token, ctx, key);
  if (!href) return <span key={key}>{children}</span>;
  const external = /^https?:\/\//i.test(href);
  return <a key={key} href={href} title={token.title} target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}>{children}</a>;
}

function renderImage(token: MarkdownToken, key: string): ReactNode {
  const src = validUrl(token.href ?? '');
  if (!src || /^(mailto:|tel:)/i.test(src)) return null;
  return <Image key={key} src={src} alt={token.text ?? ''} title={token.title}
    width={1000} height={563} unoptimized className="h-auto max-w-full" />;
}

function renderInlineFormatting(token: MarkdownToken, ctx: RenderContext, key: string): ReactNode | null {
  const children = () => inlineChildren(token, ctx, key);
  switch (token.type) {
    case 'text': return <span key={key}>{children()}</span>;
    case 'escape': return <span key={key}>{token.text}</span>;
    case 'strong': return <strong key={key}>{children()}</strong>;
    case 'em': return <em key={key}>{children()}</em>;
    case 'del': return <del key={key}>{children()}</del>;
    case 'codespan': return <code key={key}>{token.text}</code>;
    default: return null;
  }
}

function renderInlineToken(token: MarkdownToken, ctx: RenderContext, key: string): ReactNode {
  const formatted = renderInlineFormatting(token, ctx, key);
  if (formatted !== null) return formatted;
  switch (token.type) {
    case 'br': return <br key={key} />;
    case 'link': return renderLink(token, ctx, key);
    case 'image': return renderImage(token, key);
    case 'html': return <span key={key}>{token.text}</span>;
    default: return <span key={key}>{inlineChildren(token, ctx, key)}</span>;
  }
}

function renderInline(tokens: MarkdownToken[], ctx: RenderContext): ReactNode[] {
  return tokens.map((token, index) => renderInlineToken(token, ctx, String(index)));
}

function tokenInline(token: MarkdownToken, ctx: RenderContext): ReactNode {
  return renderInline(token.tokens ?? [{ type: 'text', text: token.text }], ctx);
}

function renderTableCell(token: MarkdownToken, ctx: RenderContext, key: string, heading: boolean, alignment?: CSSProperties['textAlign'] | null): ReactNode {
  const Tag = heading ? 'th' : 'td';
  return <Tag key={key} style={alignment ? { textAlign: alignment } : undefined}>{tokenInline(token, ctx)}</Tag>;
}

function renderTable(token: MarkdownToken, ctx: RenderContext, key: string): ReactNode {
  return (
    <table key={key}>
      <thead><tr>{(token.header ?? []).map((cell, i) => renderTableCell(cell, ctx, String(i), true, token.align?.[i]))}</tr></thead>
      <tbody>{(token.rows ?? []).map((row, rowIndex) => (
        <tr key={rowIndex}>{row.map((cell, colIndex) =>
          renderTableCell(cell, ctx, String(colIndex), false, token.align?.[colIndex]))}</tr>
      ))}</tbody>
    </table>
  );
}

function renderListItem(item: MarkdownToken, ctx: RenderContext, highlighter: Highlighter, key: string): ReactNode {
  return (
    <li key={key}>
      {item.task && <input type="checkbox" disabled checked={Boolean(item.checked)} className="mr-2" />}
      {item.tokens?.length ? renderBlocks(item.tokens, ctx, highlighter) : renderText(item.text ?? '', ctx, key)}
    </li>
  );
}

function renderList(token: MarkdownToken, ctx: RenderContext, highlighter: Highlighter, key: string): ReactNode {
  const children = token.items?.map((item, index) => renderListItem(item, ctx, highlighter, String(index)));
  return token.ordered
    ? <ol key={key} start={Number(token.start) || 1}>{children}</ol>
    : <ul key={key}>{children}</ul>;
}

function renderCode(token: MarkdownToken, highlighter: Highlighter, key: string): ReactNode {
  const code = token.text ?? '';
  const lang = (token.lang ?? '').split(/\s+/)[0] || 'text';
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    return <pre key={key}><code>{code}</code></pre>;
  }
  const lines = highlighter.codeToTokens(code, { lang: lang as BundledLanguage, theme: 'github-dark-dimmed' }).tokens;
  return (
    <pre key={key}><code className={'language-' + lang}>
      {lines.map((line, row) => (
        <span key={row} className="block">
          {line.map((part, col) => (
            <span key={col} style={{ color: part.color }}>{part.content}</span>
          ))}
          {'\n'}
        </span>
      ))}
    </code></pre>
  );
}

function renderBlockBasic(token: MarkdownToken, ctx: RenderContext, highlighter: Highlighter, key: string): ReactNode | undefined {
  switch (token.type) {
    case 'heading': {
      const id = getHeadingId(token.text ?? '', ctx.headings);
      const depth = Math.max(1, Math.min(6, token.depth ?? 2));
      return createElement('h' + depth, { key, id }, tokenInline(token, ctx));
    }
    case 'paragraph': return <p key={key}>{tokenInline(token, ctx)}</p>;
    case 'text': return <span key={key}>{tokenInline(token, ctx)}</span>;
    case 'code': return renderCode(token, highlighter, key);
    case 'list': return renderList(token, ctx, highlighter, key);
    default: return undefined;
  }
}

function renderBlock(token: MarkdownToken, ctx: RenderContext, highlighter: Highlighter, key: string): ReactNode {
  const basic = renderBlockBasic(token, ctx, highlighter, key);
  if (basic !== undefined) return basic;
  switch (token.type) {
    case 'table': return renderTable(token, ctx, key);
    case 'blockquote': return <blockquote key={key}>{renderBlocks(token.tokens ?? [], ctx, highlighter)}</blockquote>;
    case 'hr': return <hr key={key} />;
    case 'html': return <p key={key}>{token.text}</p>;
    default: return null;
  }
}

function renderBlocks(tokens: MarkdownToken[], ctx: RenderContext, highlighter: Highlighter): ReactNode[] {
  return tokens.map((token, index) => renderBlock(token, ctx, highlighter, String(index)));
}

/** Externí reference nedostanou doporučení pro crawlery ani přenos referreru.
 * Porovnává hostname, nikoli substring URL (např. petrvurm.cz.example.org je externí).
 */
function isOwnWebsite(url: string): boolean {
  const hostname = new URL(url).hostname.toLowerCase().replace(/\.$/, '');
  return hostname === 'petrvurm.cz' || hostname.endsWith('.petrvurm.cz');
}

function RenderedReferences({ references }: { references: Reference[] }) {
  if (!references.length) return null;
  return (
    <section className="mt-12 border-t border-white/10 pt-8" aria-labelledby="blog-reference-title">
      <h2 id="blog-reference-title">Zdroje a reference</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6">
        {references.map((ref) => {
          const external = !isOwnWebsite(ref.url);
          return (
            <li key={ref.id} id={'ref-' + ref.id}>
              <a href={ref.url} target={external ? '_blank' : undefined}
                rel={external ? 'nofollow noopener noreferrer' : undefined}>{ref.label}</a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default async function MarkdownContent({ content }: { content: string }) {
  const highlighter = await highlighterPromise;
  const { body, references } = readReferences(content);
  const ctx: RenderContext = { references, cited: [], headings: new Map() };
  const lexer = new Marked();
  const tokens = lexer.lexer(body) as unknown as MarkdownToken[];

  return (
    <div className="markdown-body max-w-none">
      {renderBlocks(tokens, ctx, highlighter)}
      <RenderedReferences references={ctx.cited} />
    </div>
  );
}
