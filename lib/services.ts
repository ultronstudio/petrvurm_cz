// ===== SERVICES DEFINITION =====
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

// Všechny služby dostupné v jakémkoliv městě
export const DEFAULT_CITY_SERVICES = Object.keys(ALL_SERVICES);
