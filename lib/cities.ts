import { MANUAL_CITIES_CONFIG } from './cities-config';
import { STATIC_TOWNS } from './towns';
import { DEFAULT_CITY_SERVICES } from './services';

// ===== CITY CONFIGURATION =====
export type CityConfig = {
  name: string;
  slug: string;
  priceCoefficient: number;
  allowedServices: string[];
};

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Vytvoří index všech měst:
 * 1. Z MANUAL_CITIES_CONFIG (ručně editovatelná, mají prioritu)
 * 2. Ze STATIC_TOWNS (všechna ostatní města se default konfigurací)
 */
function buildCitiesIndex(): Record<string, CityConfig> {
  const index: Record<string, CityConfig> = {};

  // Nejdřív přidáme ručně nastavená města (mají prioritu)
  MANUAL_CITIES_CONFIG.forEach((entry) => {
    const slug = entry.slug.toLowerCase().trim();
    index[slug] = {
      name: entry.name,
      slug: entry.slug,
      priceCoefficient: entry.priceCoefficient,
      allowedServices: entry.allowedServices,
    };
  });

  // Pak přidáme všechna zbývající města ze STATIC_TOWNS s default konfigurací
  const manualSlugs = new Set(MANUAL_CITIES_CONFIG.map(c => c.slug.toLowerCase()));
  
  STATIC_TOWNS.forEach((townName) => {
    const slug = slugify(townName);
    
    // Přidáme jen pokud není už v manual konfiguraci
    if (!manualSlugs.has(slug)) {
      index[slug] = {
        name: townName,
        slug: slug,
        priceCoefficient: 1.0,
        allowedServices: DEFAULT_CITY_SERVICES,
      };
    }
  });

  return index;
}

export const CITIES_CONFIG: Record<string, CityConfig> = buildCitiesIndex();

/**
 * Získá konfiguraci konkrétního města
 */
export function getCityConfig(citySlug: string): CityConfig | null {
  const normalizedCity = citySlug.toLowerCase().trim();
  return CITIES_CONFIG[normalizedCity] || null;
}

/**
 * Vrátí všechna dostupná města
 */
export function getAllCities(): CityConfig[] {
  return Object.values(CITIES_CONFIG);
}
