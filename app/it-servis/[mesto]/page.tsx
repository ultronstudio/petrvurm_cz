import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCities, getCityConfig, getServicesForCity, SITE_URL } from '@/site.config';
import CityServicesClient from '@/components/CityServicesClient/CityServicesClient';

type CityPageProps = {
  params: Promise<{ mesto: string }>;
};

export function generateStaticParams() {
  return getAllCities().map((city) => ({ mesto: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { mesto } = await params;
  const city = getCityConfig(mesto);

  if (!city) {
    return {
      title: 'Lokalita nenalezena – Petr Vurm',
      robots: { index: false, follow: false },
    };
  }

  const title = `IT servis ${city.name} – Petr Vurm`;
  const description = `Lokální IT servis v ${city.name}: nastavení Wi-Fi, tiskáren, chytrých zařízení a technologické konzultace.`;
  const url = `${SITE_URL}/it-servis/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { mesto } = await params;
  const cityConfig = getCityConfig(mesto);
  if (!cityConfig) notFound();

  return (
    <CityServicesClient
      city={cityConfig.name}
      services={getServicesForCity(cityConfig.slug)}
      cityConfig={cityConfig}
    />
  );
}
