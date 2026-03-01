'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Service } from '@/lib/services';
import { CityConfig } from '@/lib/cities';
import CityServicesClient from '@/components/CityServicesClient/CityServicesClient';

interface CityServicesClientWrapperProps {
  city: string;
  services: Service[];
  cityConfig: CityConfig | null;
  citySlug: string;
}

export default function CityServicesClientWrapper({
  city,
  services,
  cityConfig,
  citySlug,
}: CityServicesClientWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Pokud město neexistuje a komponenta je mounted, přesměrujeme na /it-servis
  React.useEffect(() => {
    if (mounted && !cityConfig) {
      router.replace('/it-servis');
    }
  }, [mounted, cityConfig, router]);

  // Pokud město neexistuje, nezobrazujeme nic (prevent flash)
  if (!cityConfig) {
    return null;
  }

  return <CityServicesClient city={city} services={services} cityConfig={cityConfig} />;
}
