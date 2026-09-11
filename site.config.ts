import { ALL_SERVICES, type Service } from './lib/services';
import { getCityConfig, getAllCities, type CityConfig } from './lib/cities';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://petrvurm.cz';

export const STATIC_ROUTES = [
  '/',
  '/o-mne',
  '/cenik',
  '/vyuka',
  '/kontakt',
  '/projekty',
  '/jak-pracuji',
  '/it-servis',
  '/gdpr',
  '/obchodni-podminky',
] as const;

export type { Service, CityConfig };
export { getCityConfig, getAllCities };

export function getServicesForCity(citySlug: string): Service[] {
  const config = getCityConfig(citySlug);
  if (!config) return [];

  return config.allowedServices
    .map((id) => ALL_SERVICES[id])
    .filter((service): service is Service => Boolean(service));
}
