'use client';

import React from 'react';
import {
  Wifi,
  Monitor,
  Code,
  Mail,
  Phone,
  House,
  Zap,
} from 'lucide-react';
import { Service, CityConfig } from '@/site.config';

interface CityServicesClientProps {
  city: string;
  services: Service[];
  cityConfig?: CityConfig | null;
}

// Mapování ikon na základě ID služby (mnohem spolehlivější než text stringu)
const iconMap: Record<string, React.ReactNode> = {
  'mesh_wifi': <Wifi className="h-6 w-6 text-[#00B7EF]" />,
  'tiskarny_tv': <Monitor className="h-6 w-6 text-[#00B7EF]" />,
  'weby_zivnostnici': <Code className="h-6 w-6 text-[#00B7EF]" />,
  'it_konzultace': <Zap className="h-6 w-6 text-[#00B7EF]" />,
  default: <House className="h-6 w-6 text-[#00B7EF]" />,
};

// Počítání ceny s koeficientem vzdálenosti
function getPriceWithCoefficient(basePrice: number, coefficient: number): string {
  const finalPrice = Math.round(basePrice * coefficient);
  return `${finalPrice} Kč`;
}

export const CityServicesClient: React.FC<CityServicesClientProps> = ({
  city,
  services,
  cityConfig,
}) => {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Sekce */}
      <header className="pt-20 pb-10 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Čisté IT služby pro <span className="text-[#00B7EF]">{city}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Rychle, bez zednického nepořádku a s jasnou cenou. Jsem váš místní IT
            soused a vyřeším vaše potíže ještě dnes.
          </p>
          {cityConfig && cityConfig.priceCoefficient > 1.0 && (
            <p className="text-sm text-gray-400 mb-4">
              *Ceny zahrnují příplatek za vzdálenost ({Math.round((cityConfig.priceCoefficient - 1) * 100)}%)
            </p>
          )}
        </div>
      </header>

      {/* Služby */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">S čím vám pomohu</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc: { basePrice: number; basePriceText: string | string[]; id: React.Key | null | undefined; category: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => {
              const displayPrice = cityConfig 
                ? getPriceWithCoefficient(svc.basePrice, cityConfig.priceCoefficient)
                : svc.basePriceText;
              
              return (
                <div
                  key={svc.id}
                  className="flex flex-col p-8 bg-[#1a1a1a] rounded-2xl border border-[#333333] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-[#00B7EF] uppercase tracking-wider mb-2">
                    {svc.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-gray-300 flex-grow mb-6 leading-relaxed">
                    {svc.description}
                  </p>
                  <div className="pt-4 border-t border-gray-700">
                    <span className="font-bold text-white">{displayPrice}</span>&nbsp;/&nbsp;{svc.basePriceText.includes('/ h') ? 'hodinu' : 'službu'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="py-20 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Pojďme to vyřešit</h2>
        <p className="text-lg text-gray-300 mb-10">
          Napište mi, co přesně vás trápí, nebo rovnou zavolejte. Rád s vámi proberu možnosti.
        </p>
        <div className="flex justify-center">
          <a
            href="/kontakt"
            className="flex items-center justify-center gap-3 bg-[#1a1a1a] border-2 border-[#00B7EF] text-[#00B7EF] px-8 py-4 rounded-lg font-semibold hover:bg-[#2a2a2a] transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>Kontaktovat mě</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CityServicesClient;
