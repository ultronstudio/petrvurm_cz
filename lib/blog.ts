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
  imageCaption: string;
  imageCredit: string;
  imageCreditUrl: string;
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

function optionalHttpUrl(data: Frontmatter, keys: string[], label: string, file: string): string {
  const value = optionalString(data, keys);
  if (!value) return '';
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
  } catch {
    // Zpracuje společná chyba níže.
  }
  throw new Error(`Blogový soubor ${file}: pole "${label}" musí obsahovat platnou http(s) URL.`);
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

// Starší články mohou obsahovat pouze datum. Přesný čas musí vždy obsahovat
// explicitní časové pásmo, aby jej build na jiném serveru neposunul.
const BLOG_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const BLOG_DATE_TIME = /^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/;

function isValidBlogDate(value: string): boolean {
  if (!BLOG_DATE_ONLY.test(value) && !BLOG_DATE_TIME.test(value)) return false;
  const datePart = value.slice(0, 10);
  const midnight = new Date(`${datePart}T00:00:00.000Z`);
  if (Number.isNaN(midnight.getTime()) || midnight.toISOString().slice(0, 10) !== datePart) return false;
  if (BLOG_DATE_ONLY.test(value)) return true;

  // Maximální platný posun ISO 8601 je 14:00.
  const offset = value.match(/([+-])(\d{2}):(\d{2})$/);
  if (offset && offset[2] === '14' && offset[3] !== '00') return false;
  return !Number.isNaN(Date.parse(value));
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
  if (!isValidBlogDate(normalized)) {
    throw new Error(`Blogový soubor ${file}: pole \"${label}\" musí být platné datum YYYY-MM-DD nebo datum a čas s pásmem (např. 2026-11-10T07:30:00+01:00).`);
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
    imageCaption: optionalString(frontmatter, ['imageCaption', 'popisekObrazku']),
    imageCredit: optionalString(frontmatter, ['imageCredit', 'autorObrazku']),
    imageCreditUrl: optionalHttpUrl(frontmatter, ['imageCreditUrl', 'zdrojObrazku'], 'imageCreditUrl', fileName),
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

/** Na detailu článku zobrazuje čas pouze tehdy, je-li uveden ve frontmatteru. */
export function formatBlogDateTime(value: string): string {
  if (!value.includes('T')) return formatBlogDate(value);
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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
