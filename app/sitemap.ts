import { promises as fs } from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { getAllCities, SITE_URL, STATIC_ROUTES } from '@/site.config';

async function getProjectSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(path.join(process.cwd(), 'projekty'));
    return files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();
  const routes = [
    ...STATIC_ROUTES,
    ...projectSlugs.map((slug) => `/projekty/${slug}`),
    ...getAllCities().map((city) => `/it-servis/${city.slug}`),
  ];

  return [...new Set(routes)].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith('/projekty/') ? 'monthly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/it-servis/') ? 0.4 : 0.7,
  }));
}
