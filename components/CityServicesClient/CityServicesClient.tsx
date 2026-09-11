import Link from 'next/link';
import { SITE_URL, type CityConfig, type Service } from '@/site.config';
import { calculateLocalServicePrice, formatPrice } from '@/lib/pricing';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';

interface CityServicesProps {
  city: string;
  services: Service[];
  cityConfig: CityConfig;
}

function getDisplayPrice(service: Service, coefficient: number): string {
  if (coefficient === 1) return service.basePriceText;

  const price = formatPrice(calculateLocalServicePrice(service.basePrice, coefficient));
  return service.basePriceText.startsWith('od ') ? `od ${price}` : price;
}

function getPriceSpecification(service: Service, coefficient: number) {
  const price = calculateLocalServicePrice(service.basePrice, coefficient);

  if (service.basePriceText.startsWith('od ')) {
    return {
      '@type': 'PriceSpecification',
      minPrice: price,
      priceCurrency: 'CZK',
    };
  }

  if (service.basePriceText.includes('/ h')) {
    return {
      '@type': 'UnitPriceSpecification',
      price,
      priceCurrency: 'CZK',
      unitText: 'hodina',
    };
  }

  return {
    '@type': 'PriceSpecification',
    price,
    priceCurrency: 'CZK',
  };
}

export default function CityServicesClient({ city, services, cityConfig }: CityServicesProps) {
  const url = `${SITE_URL}/it-servis/${cityConfig.slug}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const serviceId = `${url}#service`;
  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: `IT servis ${city} – Petr Vurm`,
        description: `Lokální IT servis v lokalitě ${city}: domácí síť, Mesh Wi-Fi, tiskárny, chytré TV a technologická konzultace.`,
        inLanguage: 'cs-CZ',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        mainEntity: { '@id': serviceId },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: `IT servis – ${city}`,
        serviceType: 'Lokální IT servis',
        url,
        provider: { '@id': PERSON_ID },
        areaServed: {
          '@type': 'Place',
          name: city,
        },
        offers: services.map((service) => ({
          '@type': 'Offer',
          seller: { '@id': PERSON_ID },
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            serviceType: service.category,
            provider: { '@id': PERSON_ID },
            areaServed: { '@type': 'Place', name: city },
          },
          priceSpecification: getPriceSpecification(service, cityConfig.priceCoefficient),
        })),
      },
      {
        ...breadcrumbJsonLd([
          { name: 'Petr Vurm', path: '/' },
          { name: 'Lokální IT servis', path: '/it-servis' },
          { name: city, path: `/it-servis/${cityConfig.slug}` },
        ]),
        '@id': breadcrumbId,
      },
    ],
  };

  return (
    <div className="text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(cityServiceJsonLd) }} />
      <header className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">IT servis – {city}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/70">Pomoc s domácí sítí, připojením zařízení a běžným nastavením techniky.</p>
        {cityConfig.priceCoefficient > 1 && <p className="mt-3 text-sm text-white/50">U této lokality se cena výjezdu upravuje podle vzdálenosti.</p>}
      </header>

      <section className="mx-auto max-w-4xl border-t border-white/10 px-4 py-10 md:px-6" aria-labelledby="lokalni-sluzby">
        <h2 id="lokalni-sluzby" className="text-2xl font-bold">Služby</h2>
        <div className="mt-6 border-b border-white/10">
          {services.map((service) => (
            <article key={service.id} className="grid gap-3 border-t border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{service.description}</p>
                <p className="mt-2 text-xs text-white/50">{service.category}</p>
              </div>
              <p className="font-semibold text-primary sm:text-right">{getDisplayPrice(service, cityConfig.priceCoefficient)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl border-t border-white/10 px-4 py-10 md:px-6">
        <h2 className="text-2xl font-bold">Potřebujete něco jiného?</h2>
        <p className="mt-3 max-w-xl text-white/60">Napište mi, co potřebujete vyřešit a kde.</p>
        <Link href="/kontakt" className="mt-4 inline-block text-primary hover:underline">Kontakt</Link>
      </section>
    </div>
  );
}
