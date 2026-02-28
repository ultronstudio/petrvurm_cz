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


export const ALL_SERVICES = {
  mesh_wifi: {
    id: 'mesh_wifi',
    title: 'Chytrá Wi-Fi bez sekání (Mesh)',
    description: 'Konec mrtvých zón v patře nebo na zahradě. Zprovoznění moderní sítě bez tahání kabelů a vrtání.',
    price: 'od 1 500 Kč + hardware',
    category: 'Domácnosti',
  },
  tiskarny_tv: {
    id: 'tiskarny_tv',
    title: 'Zprovoznění tiskáren a chytré TV',
    description: 'Připojení k síti, nastavení tisku z mobilu, naladění a instalace aplikací (Netflix, IPTV).',
    price: '800 Kč',
    category: 'Domácnosti',
  },
  it_konzultace: {
    id: 'it_konzultace',
    title: 'Online IT a technologické konzultace',
    description: 'Pomoc s výběrem podnikového softwaru, návrh architektury nebo zrychlení stávajících procesů.',
    price: '350 Kč / h',
    category: 'Online služby',
  }
};

export const ZONES = {
  LOCAL: {
    cities: ['nechanice', 'tune', 'sobetus', 'sucha', 'mokrovousy', 'tresovice', 'strezetice', 'komarov'],
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace']
  },
  REGIONAL: {
    cities: ['hradec-kralove', 'novy-bydzov', 'horice'],
    allowedServices: ['it_konzultace']
  },
  REMOTE: {
    allowedServices: ['it_konzultace']
  }
};

export function getServicesForCity(citySlug: string) {
  const normalizedCity = citySlug.toLowerCase().trim();
  if (ZONES.LOCAL.cities.includes(normalizedCity)) {
    return ZONES.LOCAL.allowedServices.map(id => ALL_SERVICES[id]);
  } 
  
  if (ZONES.REGIONAL.cities.includes(normalizedCity)) {
    return ZONES.REGIONAL.allowedServices.map(id => ALL_SERVICES[id]);
  }

  return ZONES.REMOTE.allowedServices.map(id => ALL_SERVICES[id]);
}