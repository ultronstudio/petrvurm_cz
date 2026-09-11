import Link from 'next/link';
import { BASE_HOURLY_RATE, BASE_PROJECT_RATES, formatFromPrice } from '@/lib/pricing';
import { SITE_URL } from '@/site.config';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';

const prices = [
  { name: 'Web Start', value: BASE_PROJECT_RATES.webStart, description: 'Jednoduchý one-page web nebo menší prezentace služby.' },
  { name: 'Firemní web', value: BASE_PROJECT_RATES.businessWeb, description: 'Více podstránek, vlastní struktura, formuláře a základní SEO.' },
  { name: 'Web s CMS', value: BASE_PROJECT_RATES.cmsWeb, description: 'Firemní web s editovatelným obsahem a dalšími funkcemi.' },
  { name: 'E-shop', value: BASE_PROJECT_RATES.shop, description: 'Menší e-shop. Cenu ovlivňuje katalog, platby, doprava a případná napojení.' },
  { name: 'Webová aplikace', value: BASE_PROJECT_RATES.webApp, description: 'Aplikace s vlastní logikou, databází, uživatelskými účty nebo API.' },
] as const;

const breadcrumbId = `${SITE_URL}/cenik#breadcrumb`;
const catalogId = `${SITE_URL}/cenik#offer-catalog`;

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/cenik#page`,
      url: `${SITE_URL}/cenik`,
      name: 'Ceník – Petr Vurm',
      description: 'Orientační ceny webových stránek, webových aplikací a hodinové práce Petra Vurma.',
      inLanguage: 'cs-CZ',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      mainEntity: { '@id': catalogId },
      breadcrumb: { '@id': breadcrumbId },
    },
    {
      '@type': 'OfferCatalog',
      '@id': catalogId,
      name: 'Tvorba webů a webových aplikací',
      itemListElement: [
        ...prices.map((item) => ({
          '@type': 'Offer',
          seller: { '@id': PERSON_ID },
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.description,
            provider: { '@id': PERSON_ID },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: item.value,
            priceCurrency: 'CZK',
          },
        })),
        {
          '@type': 'Offer',
          seller: { '@id': PERSON_ID },
          itemOffered: {
            '@type': 'Service',
            name: 'Hodinová práce',
            description: 'Menší úpravy, servis a navazující vývoj.',
            provider: { '@id': PERSON_ID },
          },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: BASE_HOURLY_RATE,
            priceCurrency: 'CZK',
            unitText: 'hodina',
          },
        },
      ],
    },
    {
      ...breadcrumbJsonLd([
        { name: 'Petr Vurm', path: '/' },
        { name: 'Ceník', path: '/cenik' },
      ]),
      '@id': breadcrumbId,
    },
  ],
};

export default function Cenik() {
  return (
    <section className="py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pricingJsonLd) }} />
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Ceník</h1>
          <p className="mt-4 leading-7 text-white/70">Orientační ceny nejčastějších typů webů a aplikací.</p>
        </header>

        <div className="mt-10 border-b border-white/10">
          {prices.map((item) => (
            <div key={item.name} className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[1fr_auto] md:gap-10">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{item.description}</p>
              </div>
              <p className="text-lg font-semibold text-primary md:text-right">{formatFromPrice(item.value)}</p>
            </div>
          ))}
          <div className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <h2 className="text-xl font-semibold">Hodinová práce</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Menší úpravy, servis a navazující vývoj.</p>
            </div>
            <p className="text-lg font-semibold text-primary md:text-right">{BASE_HOURLY_RATE} Kč / hod</p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl">
          <p className="leading-7 text-white/70">Přesná cena závisí na rozsahu, obsahu a požadovaných funkcích. U větších nebo neobvyklých projektů připravím individuální nabídku.</p>
          <p className="mt-3 text-sm text-white/50">Jsem neplátce DPH.</p>
          <Link href="/kontakt" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">Kontakt</Link>
        </div>
      </div>
    </section>
  );
}
