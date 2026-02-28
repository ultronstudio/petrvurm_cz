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

// Přesná definice toho, co ti vrací tvůj config
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

interface CityServicesClientProps {
  city: string;
  services: ServiceItem[];
}

// Mapování ikon na základě ID služby (mnohem spolehlivější než text stringu)
const iconMap: Record<string, React.ReactNode> = {
  'mesh_wifi': <Wifi className="h-6 w-6 text-indigo-600" />,
  'tiskarny_tv': <Monitor className="h-6 w-6 text-indigo-600" />,
  'weby_zivnostnici': <Code className="h-6 w-6 text-indigo-600" />,
  'it_konzultace': <Zap className="h-6 w-6 text-indigo-600" />,
  default: <House className="h-6 w-6 text-indigo-600" />,
};

export const CityServicesClient: React.FC<CityServicesClientProps> = ({
  city,
  services,
}) => {
  return (
    <div className="text-gray-800 bg-slate-50 min-h-screen">
      {/* Hero Sekce */}
      <header className="bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-100 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
            Čisté IT služby pro <span className="text-indigo-600">{city}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Rychle, bez zednického nepořádku a s jasnou cenou. Jsem váš místní IT
            soused a vyřeším vaše potíže ještě dnes.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            Nezávazně se ozvat
          </a>
        </div>
      </header>

      {/* Služby */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">S čím vám pomohu</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                {iconMap[svc.id] || iconMap.default}
              </div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                {svc.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{svc.title}</h3>
              <p className="text-gray-600 flex-grow mb-6 leading-relaxed">
                {svc.description}
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="font-bold text-gray-900">{svc.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proč já */}
      <section className="bg-white py-20 px-4 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Proč si vybrat mě?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <House className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Jsem místní</h3>
              <p className="text-gray-600">Bydlím kousek od obce {city}. Neplatíte předražené výjezdy z Hradce.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Čistá práce</h3>
              <p className="text-gray-600">Nepořádku se bát nemusíte. Specializuji se na bezdrátová a softwarová řešení.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Férové ceny</h3>
              <p className="text-gray-600">Cenu znáte vždy předem. Žádné umělé natahování hodinové sazby.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="py-20 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Pojďme to vyřešit</h2>
        <p className="text-lg text-gray-600 mb-10">
          Napište mi, co přesně vás trápí, nebo rovnou zavolejte. Rád s vámi proberu možnosti.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:kontakt@petrvurm.cz"
            className="flex items-center justify-center gap-3 bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>kontakt@petrvurm.cz</span>
          </a>
          <a
            href="tel:+420777416611"
            className="flex items-center justify-center gap-3 bg-indigo-600 text-white border-2 border-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 hover:border-indigo-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>777 416 611</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CityServicesClient;