import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { SITE_URL, STATIC_ROUTES } from "@/site.config";

// funkce, co načte slugy z /projekty/*.md
async function getMarkdownSlugs(): Promise<string[]> {
  const dir = path.join(process.cwd(), "projekty");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch (err) {
    console.error("Nepodařilo se načíst složku /projekty:", err);
    return [];
  }
}

function buildUrlEntry(loc: string, lastmod: string, priority = "0.8", changefreq = "monthly") {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export async function GET() {
  const now = new Date().toISOString();
  const slugs = await getMarkdownSlugs();

  const dynamicRoutes = slugs.map((slug) => `/projekty/${slug}`);
  const allRoutes = Array.from(new Set([...STATIC_ROUTES, ...dynamicRoutes]));

  const urls = allRoutes
    .map((route) => {
      const loc = `${SITE_URL}${route}`;
      const priority = route === "/" ? "1.0" : route.startsWith("/projekty/") ? "0.6" : "0.8";
      const freq = route.startsWith("/projekty/") ? "weekly" : "monthly";
      return buildUrlEntry(loc, now, priority, freq);
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
