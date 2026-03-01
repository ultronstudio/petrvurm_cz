'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

// static city lists, formatted later
const LOCAL_CITIES = [
  'Nechanice',
  'Tůně',
  'Sobětuš',
  'Suchá',
  'Mokrovousy',
  'Třesovice',
  'Střezetice',
  'Komárov',
];
const REGIONAL_CITIES = ['Hradec Králové', 'Nový Bydžov', 'Hořice'];

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
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const slug = slugify(query);
    if (slug) {
      router.push(`/it-servis/${slug}`);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero with form */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">
            Zjistěte, zda jsou ve vaší obci dostupné mé IT služby
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              aria-label="Název obce"
              placeholder="Zadejte název vaší obce..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B7EF]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#00B7EF] hover:bg-[#009edb] rounded-md font-semibold transition text-black"
            >
              Ověřit dostupnost
            </button>
          </form>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#1a1a1a] py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Proč lokální IT servis od Petra Vurma?
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
                {LOCAL_CITIES.map((city) => (
                  <Link
                    key={city}
                    href={`/it-servis/${slugify(city)}`}
                    className="block break-inside-avoid mb-1 text-[#00B7EF] hover:underline"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Širší region</h3>
              <div className="columns-2 sm:columns-3 gap-4">
                {REGIONAL_CITIES.map((city) => (
                  <Link
                    key={city}
                    href={`/it-servis/${slugify(city)}`}
                    className="block break-inside-avoid mb-1 text-[#00B7EF] hover:underline"
                  >
                    {city}
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

