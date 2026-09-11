import { BASE_HOURLY_RATE } from './pricing';

export type Service = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  basePriceText: string;
  category: string;
};

export const ALL_SERVICES: Record<string, Service> = {
  mesh_wifi: {
    id: 'mesh_wifi',
    title: 'Nastavení Mesh Wi-Fi',
    description: 'Návrh a zprovoznění bezdrátové sítě pro lepší pokrytí domu nebo menší provozovny.',
    basePrice: 1500,
    basePriceText: 'od 1 500 Kč + hardware',
    category: 'Lokální IT servis',
  },
  tiskarny_tv: {
    id: 'tiskarny_tv',
    title: 'Tiskárny a chytré TV',
    description: 'Připojení zařízení k síti, nastavení tisku, aplikací a základní konfigurace.',
    basePrice: 800,
    basePriceText: '800 Kč',
    category: 'Lokální IT servis',
  },
  it_konzultace: {
    id: 'it_konzultace',
    title: 'IT a technologická konzultace',
    description: 'Konzultace výběru technologií, softwaru, architektury nebo dalšího rozvoje řešení.',
    basePrice: BASE_HOURLY_RATE,
    basePriceText: `${BASE_HOURLY_RATE} Kč / h`,
    category: 'Konzultace',
  },
};

export const DEFAULT_CITY_SERVICES = Object.keys(ALL_SERVICES);
