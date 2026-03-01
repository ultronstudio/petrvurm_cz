/**
 * Ručně editovatelná konfigurace měst a obcí
 * Zde můžeš upravovat jednotlivá města: jejich cenu, dostupné služby, koeficienty atd.
 * Akékoliv město zde definované bude mít vlastní stránku na /it-servis/[slug]
 */

export type CityConfigEntry = {
  name: string;
  slug: string;
  priceCoefficient: number;
  allowedServices: string[];
};

export const MANUAL_CITIES_CONFIG: CityConfigEntry[] = [
  // Lokální zóna
  {
    name: 'Nechanice',
    slug: 'nechanice',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Tůně',
    slug: 'tune',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Sobětuš',
    slug: 'sobetus',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Suchá',
    slug: 'sucha',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Mokrovousy',
    slug: 'mokrovousy',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Třesovice',
    slug: 'tresovice',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Střezetice',
    slug: 'strezetice',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Komárov',
    slug: 'komarov',
    priceCoefficient: 1.0,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  // Širší region
  {
    name: 'Hradec Králové',
    slug: 'hradec-kralove',
    priceCoefficient: 1.2,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Nový Bydžov',
    slug: 'novy-bydzov',
    priceCoefficient: 1.15,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
  {
    name: 'Hořice',
    slug: 'horice',
    priceCoefficient: 1.1,
    allowedServices: ['mesh_wifi', 'tiskarny_tv', 'it_konzultace'],
  },
];
