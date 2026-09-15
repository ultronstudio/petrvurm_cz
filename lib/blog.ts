import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const BLOG_DIRECTORY = path.join(process.cwd(), 'blog');

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string | null;
  topics: string[];
  keywords: string[];
  draft: boolean;
  index: boolean;
  content: string;
};

type Frontmatter = Record<string, unknown>;

function valueFor(data: Frontmatter, keys: string[]): unknown {
  for (const key of keys) {
    if (data[key] !== undefined && data[key] !== null) return data[key];
  }
  return undefined;
}

function requiredString(data: Frontmatter, keys: string[], label: string, file: string): string {
  const value = valueFor(data, keys);
  const normalized = typeof value === 'string' ? value.trim() : String(value ?? '').trim();
  if (!normalized) throw new Error(`Blogový soubor ${file}: chybí povinné pole \"${label}\".`);
  return normalized;
}

function optionalString(data: Frontmatter, keys: string[]): string {
  const value = valueFor(data, keys);
  return typeof value === 'string' ? value.trim() : String(value ?? '').trim();
}

function imageValue(data: Frontmatter, file: string): string {
  const value = optionalString(data, ['image', 'obrazek', 'obrázek', 'previewImage']);
  if (value && !value.startsWith('/') && !/^https?:\/\//i.test(value)) {
    throw new Error(`Blogový soubor ${file}: pole \"image\" musí být cesta z /public nebo úplná http(s) URL.`);
  }
  return value;
}

function stringList(data: Frontmatter, keys: string[]): string[] {
  const value = valueFor(data, keys);
  const items = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
  return [...new Set(items.map((item) => String(item).trim()).filter(Boolean))];
}

function booleanValue(data: Frontmatter, keys: string[], fallback: boolean): boolean {
  const value = valueFor(data, keys);
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
}

function dateValue(data: Frontmatter, keys: string[], label: string, file: string, required: true): string;
function dateValue(data: Frontmatter, keys: string[], label: string, file: string, required: false): string | null;
function dateValue(data: Frontmatter, keys: string[], label: string, file: string, required: boolean): string | null {
  const value = valueFor(data, keys);
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    if (required) throw new Error(`Blogový soubor ${file}: chybí povinné pole \"${label}\".`);
    return null;
  }

  const normalized = value instanceof Date ? value.toISOString() : String(value).trim();
  if (Number.isNaN(Date.parse(normalized))) {
    throw new Error(`Blogový soubor ${file}: pole \"${label}\" neobsahuje platné datum.`);
  }
  return normalized;
}

function parseBlogFile(fileName: string): BlogPost {
  const filePath = path.join(BLOG_DIRECTORY, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const frontmatter = data as Frontmatter;
  const slug = requiredString(frontmatter, ['slug'], 'slug', fileName);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Blogový soubor ${fileName}: slug \"${slug}\" smí obsahovat jen malá písmena, čísla a pomlčky.`);
  }

  const title = requiredString(frontmatter, ['title', 'titulek'], 'title', fileName);

  return {
    slug,
    title,
    excerpt: requiredString(frontmatter, ['excerpt', 'perex', 'description'], 'excerpt', fileName),
    image: imageValue(frontmatter, fileName),
    imageAlt: optionalString(frontmatter, ['imageAlt', 'obrazekAlt']) || `Náhled článku ${title}`,
    publishedAt: dateValue(frontmatter, ['publishedAt', 'date', 'datum', 'datumNapsani', 'datumNapsání'], 'publishedAt', fileName, true),
    updatedAt: dateValue(frontmatter, ['updatedAt', 'updated', 'datumUpravy', 'datumÚpravy'], 'updatedAt', fileName, false),
    topics: stringList(frontmatter, ['topics', 'temata', 'témata']),
    keywords: stringList(frontmatter, ['keywords', 'klicovaSlova', 'klíčováSlova']),
    draft: booleanValue(frontmatter, ['draft', 'koncept'], false),
    index: booleanValue(frontmatter, ['index'], true),
    content: content.trim(),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  const posts = fs
    .readdirSync(BLOG_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_'))
    .map((entry) => parseBlogFile(entry.name));

  const seenSlugs = new Set<string>();
  for (const post of posts) {
    if (seenSlugs.has(post.slug)) throw new Error(`Duplicitní blogový slug: \"${post.slug}\".`);
    seenSlugs.add(post.slug);
  }

  return posts;
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => !post.draft);
}

export function getBlogPost(slug: string): BlogPost | null {
  return getPublishedBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Prague',
  }).format(new Date(value));
}

export function topicToSlug(topic: string): string {
  return topic
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('cs')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
