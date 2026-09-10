import Link from 'next/link';
import type { CityConfig, Service } from '@/site.config';
import { calculateLocalServicePrice, formatPrice } from '@/lib/pricing';

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

export default function CityServicesClient({ city, services, cityConfig }: CityServicesProps) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <header className="px-4 pb-10 pt-20 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Lokální IT servis</p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            IT servis v lokalitě <span className="text-primary">{city}</span>
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-gray-300 md:text-xl">
            Pomohu s domácí sítí, připojením zařízení a běžnou IT konfigurací. Rozsah a cenu si potvrdíme předem podle konkrétního požadavku.
          </p>
          {cityConfig.priceCoefficient > 1 && (
            <p className="text-sm text-gray-400">
              U této lokality se orientační ceny výjezdu upravují podle vzdálenosti.
            </p>
          )}
        </div>
      </header>

      <section className="px-4 pb-20" aria-labelledby="lokalni-sluzby">
        <div className="container mx-auto max-w-6xl">
          <h2 id="lokalni-sluzby" className="mb-10 text-center text-3xl font-bold">S čím mohu pomoci</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{service.category}</span>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="mb-6 flex-grow leading-relaxed text-white/75">{service.description}</p>
                <div className="border-t border-white/10 pt-4 font-semibold">
                  {getDisplayPrice(service, cityConfig.priceCoefficient)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Potřebujete vyřešit konkrétní problém?</h2>
        <p className="mb-8 text-lg text-gray-300">Popište mi zařízení, problém a lokalitu. Ozvu se s dalším postupem a orientační cenou.</p>
        <Link href="/kontakt" className="inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90">
          Probrat požadavek
        </Link>
      </section>
    </div>
  );
}
