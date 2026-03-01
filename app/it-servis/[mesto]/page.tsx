import React from 'react';
import { Metadata } from 'next';
import { getServicesForCity, getCityConfig, getAllCities } from '../../../site.config';
import CityServicesClient from '@/components/CityServicesClient/CityServicesClient';

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
  };
}

export default async function CityPage({ params }: { params: any }) {
  const resolved: Params = await params;
  const citySlug = resolved.mesto;
  
  // Získáme konfiguraci města a služby
  const cityConfig = getCityConfig(citySlug);
  const services = getServicesForCity(citySlug);
  const cityName = cityConfig?.name || citySlug;

  return <CityServicesClient city={cityName} services={services} cityConfig={cityConfig} />;
}