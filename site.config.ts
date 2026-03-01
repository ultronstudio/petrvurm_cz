import { ALL_SERVICES, Service } from './lib/services';
import { CITIES_CONFIG, getCityConfig, getAllCities, type CityConfig } from './lib/cities';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://petrvurm.cz";

export const STATIC_ROUTES: string[] = [
  "/",
  "/o-mne",
  "/cenik",
  "/kontakt",
  "/projekty",
  "/gdpr",
  "/obchodni-podminky",
  "/kalkulacka/web",
  "/kalkulacka/uceni",
];

// ===== RE-EXPORT TYPES & FUNCTIONS =====
export type { Service } from './lib/services';
export type { CityConfig } from './lib/cities';

/**
 * Vrátí všechny služby dostupné pro dané město
 */
export function getServicesForCity(citySlug: string): Service[] {
  const config = getCityConfig(citySlug);
  
  if (!config) {
    // Pokud město neexistuje, vrátí jen online konzultace
    return [ALL_SERVICES['it_konzultace']];
  }

  return config.allowedServices.map(id => ALL_SERVICES[id]);
}

/**
 * Alias pro getCityConfig (kvůli zpětné kompatibilitě)
 */
export { getCityConfig };

/**
 * Alias pro getAllCities (kvůli zpětné kompatibilitě)
 */
export { getAllCities };

/**
 * Vrátí všechna města jako pole (používáno pro generování statických stránek)
 */
export function getAllCitiesByRegion(): Array<{ name: string; slug: string }> {
  return getAllCities().map(city => ({
    name: city.name,
    slug: city.slug,
  }));
}
