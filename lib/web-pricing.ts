import { BASE_HOURLY_RATE, BASE_PROJECT_RATES } from './pricing';

export type BillingPeriod = 'one-time' | 'monthly' | 'yearly';
export type PricingKind = 'package' | 'addon';
export type AddonGroup = 'Provoz a správa' | 'Optimalizace' | 'Vývoj a integrace' | 'Revize existujícího webu';

export type WebPricingItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: BillingPeriod;
  kind: PricingKind;
  group?: AddonGroup;
  details?: readonly string[];
};

export const WEB_PACKAGES: readonly WebPricingItem[] = [
  {
    id: 'web-start',
    name: 'Web Start',
    description: 'Jednoduchý one-page web nebo menší prezentace služby.',
    price: BASE_PROJECT_RATES.webStart,
    billing: 'one-time',
    kind: 'package',
    details: ['responzivní zpracování', 'kontaktní formulář', 'základní technické SEO'],
  },
  {
    id: 'business-web',
    name: 'Firemní web',
    description: 'Více podstránek, vlastní struktura a formuláře.',
    price: BASE_PROJECT_RATES.businessWeb,
    billing: 'one-time',
    kind: 'package',
    details: ['návrh struktury', 'více typů obsahu', 'nasazení a předání zdrojového kódu'],
  },
  {
    id: 'cms-web',
    name: 'Web s CMS',
    description: 'Firemní web s editovatelným obsahem a administrací.',
    price: BASE_PROJECT_RATES.cmsWeb,
    billing: 'one-time',
    kind: 'package',
    details: ['editace obsahu', 'administrace', 'databáze podle potřeby'],
  },
  {
    id: 'eshop',
    name: 'E-shop',
    description: 'Katalog, košík, objednávky a administrace. Platební brána se vybírá zvlášť.',
    price: BASE_PROJECT_RATES.shop,
    billing: 'one-time',
    kind: 'package',
    details: ['produkty a varianty', 'košík a objednávkový proces', 'správa objednávek'],
  },
  {
    id: 'web-app',
    name: 'Webová aplikace',
    description: 'Aplikace s vlastní logikou, databází, uživatelskými účty nebo API.',
    price: BASE_PROJECT_RATES.webApp,
    billing: 'one-time',
    kind: 'package',
    details: ['vlastní aplikační logika', 'databáze', 'backend a API podle zadání'],
  },
] as const;

export const WEB_ADDONS: readonly WebPricingItem[] = [
  {
    id: 'payment-gateway',
    name: 'Integrace platební brány',
    description: 'Napojení GoPay, Comgate, Stripe nebo jiného poskytovatele včetně webhooků a testovacího režimu.',
    price: 8_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Vývoj a integrace',
  },
  {
    id: 'external-integration',
    name: 'Integrace externího systému',
    description: 'Napojení CRM, fakturace, účetního systému nebo jiného API.',
    price: 12_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Vývoj a integrace',
  },
  {
    id: 'newsletter',
    name: 'E-mailing a newsletter',
    description: 'Napojení mailingové služby, formulářů a základní automatizace.',
    price: 6_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Vývoj a integrace',
  },
  {
    id: 'hosting-setup',
    name: 'Doména, DNS, hosting a HTTPS',
    description: 'Technické nastavení domény, DNS, hostingu, HTTPS a prvního nasazení. Poplatky poskytovatelům nejsou v ceně.',
    price: 4_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Provoz a správa',
  },
  {
    id: 'own-server-deploy',
    name: 'Nasazení na vlastní server',
    description: 'Konfigurace produkčního prostředí, HTTPS, základní hardening a ověření nasazení.',
    price: 6_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Provoz a správa',
  },
  {
    id: 'monthly-care',
    name: 'Měsíční správa webu',
    description: 'Aktualizace, monitoring, zálohy a průběžné technické opravy.',
    price: 2_400,
    billing: 'monthly',
    kind: 'addon',
    group: 'Provoz a správa',
  },
  {
    id: 'support',
    name: 'Průběžná technická podpora',
    description: 'Prioritní řešení menších požadavků a konzultace k provozu webu.',
    price: 1_600,
    billing: 'monthly',
    kind: 'addon',
    group: 'Provoz a správa',
  },
  {
    id: 'performance',
    name: 'Zrychlení webu',
    description: 'Kontrola výkonu, obrázků, načítání kódu, cache a největších praktických bottlenecků.',
    price: 6_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Optimalizace',
  },
  {
    id: 'technical-seo',
    name: 'Technické SEO a strukturovaná data',
    description: 'Metadata, canonical URL, sitemap, robots, interní struktura a smysluplné Schema.org JSON-LD.',
    price: 6_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Optimalizace',
  },
  {
    id: 'content-cleanup',
    name: 'Úprava a sazba dodaných textů',
    description: 'Zkrácení, sjednocení a zapracování dodaného obsahu do webu. Nezahrnuje kompletní profesionální copywriting.',
    price: 4_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Optimalizace',
  },
  {
    id: 'security-hardening',
    name: 'Bezpečnostní audit a hardening',
    description: 'Kontrola zjevných slabin, závislostí, konfigurace, tajných klíčů a základních bezpečnostních nastavení.',
    price: 8_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Revize existujícího webu',
  },
  {
    id: 'testing-accessibility',
    name: 'Testování a přístupnost',
    description: 'Kontrola hlavních scénářů, mobilních viewportů, chyb v konzoli a nejdůležitějších problémů přístupnosti.',
    price: 6_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Revize existujícího webu',
  },
  {
    id: 'ai-debloat',
    name: 'Revize a debloat AI webu',
    description: 'Úklid webu vzniklého s výraznou pomocí generátorů kódu: závislosti a struktura, bezpečnost, generické UI/copy patterny, testování a produkční build.',
    price: 15_000,
    billing: 'one-time',
    kind: 'addon',
    group: 'Revize existujícího webu',
    details: ['audit kódu a závislostí', 'bezpečnostní kontrola', 'odstranění typických AI/v0 design patternů', 'lint, typecheck, build a základní browser testy'],
  },
] as const;

export const ADDON_GROUPS: readonly AddonGroup[] = [
  'Provoz a správa',
  'Optimalizace',
  'Vývoj a integrace',
  'Revize existujícího webu',
] as const;

export const WEB_PRICING_ITEMS = [...WEB_PACKAGES, ...WEB_ADDONS] as const;

export const WEB_PRICING_HOURLY_RATE = BASE_HOURLY_RATE;
