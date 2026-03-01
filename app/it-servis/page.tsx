'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { STATIC_TOWNS } from '@/lib/towns';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

// static city lists, formatted later (they’re kept here for quick links but
// they are sorted alphabetically before rendering so the order is not
// arbitrary anymore). the localeCompare call uses the Czech locale so
// accented characters sort correctly.
const LOCAL_CITIES = [
  'Nechanice',
  'Tůně',
  'Sobětuš',
  'Suchá',
  'Mokrovousy',
  'Třesovice',
  'Střezetice',
  'Komárov',
].sort((a, b) => a.localeCompare(b, 'cs'));
const REGIONAL_CITIES = ['Hradec Králové', 'Nový Bydžov', 'Hořice'].sort(
  (a, b) => a.localeCompare(b, 'cs')
);

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [nearbyCities, setNearbyCities] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // if the user agrees to share location, fetch the list of towns within 30 km
  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `/api/nearby?lat=${latitude}&lon=${longitude}&radius=30000`
        );
        const data = await res.json();
        setNearbyCities(data.towns || []);
      } catch (err) {
        console.error('failed to fetch nearby', err);
      }
    });
  }, []);

  // call our API route which proxies to Mapy.cz; the route simply forwards
  // the q parameter and appends the API key from an environment variable.
  const fetchSuggestions = async (q: string) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(
        q
      )}`);
      if (res.ok) {
        const data = await res.json();
        // Mapy.cz returns items array; extract location names
        // Support both response formats: { items: [...] } or { features: [...] }
        const names = 
          (data.items?.map((item: any) => item.title || item.name) || 
           data.features?.map((f: any) => f.name) || 
           []).slice(0, 8); // limit to top 8 results
        console.log('[Autocomplete] fetched:', { q, results: names.length, names });
        setSuggestions(names);
      } else {
        console.log('[Autocomplete] error:', res.status);
        setSuggestions([]);
      }
    } catch (err) {
      console.error('[Autocomplete] fetch error', err);
      setSuggestions([]);
    }
  };

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
            <div ref={dropdownRef} className="relative flex-grow">
              <input
                type="text"
                aria-label="Název obce"
                placeholder="Zadejte název vaší obce..."
                value={query}
                onChange={(e) => {
                  const v = e.target.value;
                  setQuery(v);
                  fetchSuggestions(v);
                }}
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B7EF]"
                autoComplete="off"
              />

              {/* simple dropdown of suggestions from Mapy.cz */}
              {suggestions.length > 0 ? (
                <ul className="absolute z-50 w-full bg-gray-800 border border-gray-700 text-white rounded-md top-full mt-1 shadow-lg max-h-80 overflow-y-scroll">
                  {suggestions.map((s, index) => (
                    <li
                      key={`${s}-${index}`}
                      className="px-3 py-2 hover:bg-[#00B7EF] hover:text-black cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
                      onClick={() => {
                        setQuery(s);
                        setSuggestions([]);
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#00B7EF] hover:bg-[#009edb] rounded-md font-semibold transition"
            >
              Ověřit dostupnost
            </button>
          </form>
          {/* Mapy.cz note removed as requested */}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-800 py-16 px-4">
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
      {/* render the complete list of towns directly inside the main section */}

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            IT služby momentálně poskytuji v těchto lokalitách
          </h2>
          <div>
            <div className="columns-2 sm:columns-3 gap-4">
              {STATIC_TOWNS.map((city) => (
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
      </section>
    </div>
  );
}
