'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { getAllCitiesByRegion } from '@/site.config';

export default function ServiceChecker() {
  const localCities = getAllCitiesByRegion('local');
  const regionalCities = getAllCitiesByRegion('regional');

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">
            IT služby, které poskytuji
          </h1>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#1a1a1a] py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Proč IT servis od Petra Vurma?
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4 text-lg">
            {[
              'Žádné vrtání do zdí, vše bez kabelového chaosu',
              'Spolehlivá Wi-Fi po celém domě i na zahradě',
              'Přijedu do 24 hodin – jsem od vás ze stejné vesnice',
              'Jasná cena předem, žádné skryté poplatky',
              'Řád a čistota, po sobě uklidím – neumím být v nepořádku',
            ].map((text) => (
              <li key={text} className="flex items-start">
                <Check className="h-6 w-6 text-[#00B7EF] flex-shrink-0 mr-3" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* City lists */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            IT služby momentálně poskytuji v těchto lokalitách
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="font-semibold mb-3">Lokální zóna</h3>
              <div className="columns-2 sm:columns-3 gap-4">
                {localCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/it-servis/${city.slug}`}
                    className="block break-inside-avoid mb-1 text-[#00B7EF] hover:underline"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Širší region</h3>
              <div className="columns-2 sm:columns-3 gap-4">
                {regionalCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/it-servis/${city.slug}`}
                    className="block break-inside-avoid mb-1 text-[#00B7EF] hover:underline"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

