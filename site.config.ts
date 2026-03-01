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


// ===== SERVICES =====
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
    title: 'Chytrá Wi-Fi bez sekání (Mesh)',
    description: 'Konec mrtvých zón v patře nebo na zahradě. Zprovoznění moderní sítě bez tahání kabelů a vrtání.',
    basePrice: 1500,
    basePriceText: 'od 1 500 Kč + hardware',
    category: 'Domácnosti',
  },
  tiskarny_tv: {
    id: 'tiskarny_tv',
    title: 'Zprovoznění tiskáren a chytré TV',
    description: 'Připojení k síti, nastavení tisku z mobilu, naladění a instalace aplikací (Netflix, IPTV).',
    basePrice: 800,
    basePriceText: '800 Kč',
    category: 'Domácnosti',
  },
  it_konzultace: {
    id: 'it_konzultace',
    title: 'Online IT a technologické konzultace',
    description: 'Pomoc s výběrem podnikového softwaru, návrh architektury nebo zrychlení stávajících procesů.',
    basePrice: 350,
    basePriceText: '350 Kč / h',
    category: 'Online služby',
  }
};

// ===== CITIES ENUM =====
export enum CityName {
  // Lokální zóna
  Nechanice = 'Nechanice',
  Tune = 'Tůně',
  Sobetus = 'Sobětuš',
  Sucha = 'Suchá',
  Mokrovousy = 'Mokrovousy',
  Tresovice = 'Třesovice',
  Strezetice = 'Střezetice',
  Komarov = 'Komárov',
  // Širší region
  HradecKralove = 'Hradec Králové',
  NovyBydzov = 'Nový Bydžov',
  Horice = 'Hořice',
}

// ===== CITY CONFIGURATION =====
export type CityConfig = {
  name: CityName;
  slug: string;
  region: 'local' | 'regional';
  priceCoefficient: number;
  allowedServices: string[];
};

export const CITIES_CONFIG: Record<string, CityConfig> = {
  // Lokální zóna (bez příplatku za vzdálenost)
  nechanice: {
    name: CityName.Nechanice,
    slug: 'nechanice',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  tune: {
    name: CityName.Tune,
    slug: 'tune',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  sobetus: {
    name: CityName.Sobetus,
    slug: 'sobetus',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  sucha: {
    name: CityName.Sucha,
    slug: 'sucha',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  mokrovousy: {
    name: CityName.Mokrovousy,
    slug: 'mokrovousy',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  tresovice: {
    name: CityName.Tresovice,
    slug: 'tresovice',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  strezetice: {
    name: CityName.Strezetice,
    slug: 'strezetice',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  komarov: {
    name: CityName.Komarov,
    slug: 'komarov',
    region: 'local',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  // Širší region (příplatek za vzdálenost)
  'hradec-kralove': {
    name: CityName.HradecKralove,
    slug: 'hradec-kralove',
    region: 'regional',
    priceCoefficient: 1.2,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  'novy-bydzov': {
    name: CityName.NovyBydzov,
    slug: 'novy-bydzov',
    region: 'regional',
    priceCoefficient: 1.15,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  horice: {
    name: CityName.Horice,
    slug: 'horice',
    region: 'regional',
    priceCoefficient: 1.1,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
};

// ===== ZONES (pro zobrazení na it-servis/page.tsx) =====
export const ZONES = {
  LOCAL: {
    cities: Object.values(CITIES_CONFIG)
      .filter((c) => c.region === 'local')
      .map((c) => c.slug),
    cityNames: Object.values(CITIES_CONFIG)
      .filter((c) => c.region === 'local')
      .map((c) => c.name),
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace']
  },
  REGIONAL: {
    cities: Object.values(CITIES_CONFIG)
      .filter((c) => c.region === 'regional')
      .map((c) => c.slug),
    cityNames: Object.values(CITIES_CONFIG)
      .filter((c) => c.region === 'regional')
      .map((c) => c.name),
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace']
  },
  REMOTE: {
    allowedServices: ['it_konzultace']
  }
};

// ===== HELPER FUNCTIONS =====
export function getServicesForCity(citySlug: string): Service[] {
  const normalizedCity = citySlug.toLowerCase().trim();
  const config = CITIES_CONFIG[normalizedCity];

  if (!config) {
    return ZONES.REMOTE.allowedServices.map(id => ALL_SERVICES[id]);
  }

  return config.allowedServices.map(id => ALL_SERVICES[id]);
}

export function getCityConfig(citySlug: string): CityConfig | null {
  const normalizedCity = citySlug.toLowerCase().trim();
  return CITIES_CONFIG[normalizedCity] || null;
}

export function getAllCitiesByRegion(region: 'local' | 'regional'): CityConfig[] {
  return Object.values(CITIES_CONFIG).filter((c) => c.region === region);
}

export function getAllCities(): CityConfig[] {
  return Object.values(CITIES_CONFIG);
}