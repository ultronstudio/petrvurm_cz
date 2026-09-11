import WebPriceCalculator from '@/components/WebPriceCalculator/WebPriceCalculator';
import { SITE_URL } from '@/site.config';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';
import { WEB_PRICING_HOURLY_RATE, WEB_PRICING_ITEMS } from '@/lib/web-pricing';

const breadcrumbId = `${SITE_URL}/cenik#breadcrumb`;
const catalogId = `${SITE_URL}/cenik#offer-catalog`;

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/cenik#page`,
      url: `${SITE_URL}/cenik`,
      name: 'Ceník a kalkulátor – Petr Vurm',
      description: 'Interaktivní orientační kalkulátor webů, aplikací, správy, integrací a revizí existujících webů.',
      inLanguage: 'cs-CZ',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      mainEntity: { '@id': catalogId },
      breadcrumb: { '@id': breadcrumbId },
    },
    {
      '@type': 'OfferCatalog',
      '@id': catalogId,
      name: 'Tvorba, rozvoj a správa webů',
      itemListElement: WEB_PRICING_ITEMS.map((item) => ({
        '@type': 'Offer',
        seller: { '@id': PERSON_ID },
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.description,
          provider: { '@id': PERSON_ID },
        },
        priceSpecification:
          item.billing === 'one-time'
            ? {
                '@type': 'PriceSpecification',
                minPrice: item.price,
                priceCurrency: 'CZK',
              }
            : {
                '@type': 'UnitPriceSpecification',
                minPrice: item.price,
                priceCurrency: 'CZK',
                unitText: item.billing === 'monthly' ? 'měsíc' : 'rok',
              },
      })),
    },
    {
      '@type': 'Offer',
      seller: { '@id': PERSON_ID },
      itemOffered: {
        '@type': 'Service',
        name: 'Hodinová práce mimo domluvený rozsah',
        provider: { '@id': PERSON_ID },
      },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: WEB_PRICING_HOURLY_RATE,
        priceCurrency: 'CZK',
        unitText: 'hodina',
      },
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
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Ceník a kalkulátor</h1>
          <p className="mt-4 leading-7 text-white/70">
            Vyberte základ projektu a služby navíc. Kalkulátor průběžně odděluje jednorázové práce od měsíční nebo roční správy.
          </p>
        </header>

        <WebPriceCalculator />
      </div>
    </section>
  );
}
