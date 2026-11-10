import { marked } from 'marked';

export type BlogTocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

// Stejný algoritmus pro id nadpisu v Markdown rendereru i v navigaci.
export function getHeadingId(text: string, used: Map<string, number>): string {
  const base = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-') || 'sekce';
  const count = (used.get(base) ?? 0) + 1;
  used.set(base, count);
  return count === 1 ? base : base + '-' + count;
}

function headingLabel(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_\x60~]/g, '')
    .trim();
}

export function getBlogTableOfContents(content: string): BlogTocItem[] {
  const used = new Map<string, number>();
  const items: BlogTocItem[] = [];
  // Markdown lexer ignoruje nadpisy uvnitř fenced code bloků.
  for (const token of marked.lexer(content)) {
    if (token.type !== 'heading') continue;
    const id = getHeadingId(token.text, used);
    if (token.depth !== 2 && token.depth !== 3) continue;
    items.push({ id, title: headingLabel(token.text), depth: token.depth });
  }
  return items;
}
