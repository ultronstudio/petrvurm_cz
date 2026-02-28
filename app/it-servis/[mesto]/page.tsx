import React from 'react';
import { Metadata } from 'next';
import { getServicesForCity } from '../../../site.config';
import CityServicesClient from '@/components/CityServicesClient/CityServicesClient';

interface Params {
  mesto: string;
}

// Pomocná funkce pro hezká jména měst (např. "nove-mesto" -> "Nové Město")
function formatCityName(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generování statických cest pro rychlé načítání
export async function generateStaticParams() {
  const { ZONES } = await import('@/site.config');
  const cities = [...ZONES.LOCAL.cities, ...ZONES.REGIONAL.cities];
  return cities.map((mesto) => ({ mesto }));
}

// Dynamická metadata pro lokální SEO
export function generateMetadata({ params }: { params: Params }): Metadata {
  const cityName = formatCityName(params.mesto);
  return {
    title: `IT servis ${cityName} – Petr Vurm`,
    description: `Čisté IT služby ${cityName}: Wi‑Fi, tiskárny, weby a konzultace. Sousedská pomoc bez vrtání do zdí.`,
  };
}

export default function CityPage({ params }: { params: Params }) {
  const citySlug = params.mesto;
  // Zde získáme CELÉ objekty služeb, ne jen titulky
  const services = getServicesForCity(citySlug); 
  const cityName = formatCityName(citySlug);

  return <CityServicesClient city={cityName} services={services} />;
}