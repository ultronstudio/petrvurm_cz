'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { STATIC_TOWNS } from '@/lib/towns';

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ServiceChecker() {
  const towns = STATIC_TOWNS.map((name) => ({
    name,
    slug: slugify(name),
  }));

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
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
            {towns.map((city) => (
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
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a1a1a] py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Nenašli jste svoji obec?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Pokud vaše obec není na seznamu, neznámená to, že vám nemohu pomoci. Kontaktujte mě a podíváme se na to společně.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-8 py-3 bg-[#00B7EF] hover:bg-[#009edb] rounded-md font-semibold transition text-black"
          >
            Napsat mi zprávu
          </Link>
        </div>
      </section>
    </div>
  );
}

