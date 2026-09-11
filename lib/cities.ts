import { MANUAL_CITIES_CONFIG } from './cities-config';

export type CityConfig = {
  name: string;
  slug: string;
  priceCoefficient: number;
  allowedServices: string[];
};

export const CITIES_CONFIG: Record<string, CityConfig> = Object.fromEntries(
  MANUAL_CITIES_CONFIG.map((city) => [city.slug, city]),
);

export function getCityConfig(citySlug: string): CityConfig | null {
  return CITIES_CONFIG[citySlug.toLowerCase().trim()] ?? null;
}

export function getAllCities(): CityConfig[] {
  return Object.values(CITIES_CONFIG);
}
