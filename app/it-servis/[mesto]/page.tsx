import React from 'react';
import { Metadata } from 'next';
import { getServicesForCity, getCityConfig, getAllCities } from '@/site.config';
import CityServicesClientWrapper from '@/components/CityServicesClient/CityServicesClientWrapper';

interface Params {
  mesto: string;
}

// Generování statických cest pro rychlé načítání
export async function generateStaticParams() {
  const allCities = getAllCities();
  return allCities.map((city) => ({ mesto: city.slug }));
}

// Dynamická metadata pro lokální SEO
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolved: Params = await params;
  const cityConfig = getCityConfig(resolved.mesto);
  const cityName = cityConfig?.name || resolved.mesto;
  
  return {
    title: `IT servis ${cityName} – Petr Vurm`,
    description: `Čisté IT služby ${cityName}: Wi‑Fi, tiskárny, weby a konzultace. Sousedská pomoc bez vrtání do zdí.`,
    openGraph: {
      title: `IT servis ${cityName} – Petr Vurm`,
      description: `Čisté IT služby ${cityName}: Wi‑Fi, tiskárny, weby a konzultace. Sousedská pomoc bez vrtání do zdí.`,
      type: "website"
    }
  };
}

export default async function CityPage({ params }: { params: any }) {
  const resolved: Params = await params;
  const citySlug = typeof resolved.mesto === 'string' ? resolved.mesto : '';
  
  // Získáme konfiguraci města a služby
  const cityConfig = getCityConfig(citySlug);
  const services = getServicesForCity(citySlug);

  // Pokud město neexistuje, vrátíme null (redirect se stane na klient-side)
  if (!cityConfig) {
    return null;
  }

  const cityName = cityConfig.name;

  return <CityServicesClientWrapper city={cityName} services={services} cityConfig={cityConfig} citySlug={citySlug} />;
}
