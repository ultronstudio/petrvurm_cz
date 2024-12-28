"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";

interface CenikItemProps {
  title: string;
  description: string;
  features: string[];
  price: number;
  type?: "main" | "additional"; // Typ služby (hlavní nebo doplňková)
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

const cenikItems = [
  // Main Services
  {
    title: "SEO optimalizace",
    description: "Optimalizace webu pro vyhledávače, zlepšení viditelnosti a SEO analýza.",
    features: [
      "SEO analýza",
      "Optimalizace klíčových slov",
      "Vylepšení viditelnosti",
    ],
    price: 8000,
    type: "main",
  },
  {
    title: "Front-end vývoj",
    description: "Tvorba front-endu s moderními JavaScriptovými frameworky a responzivním designem.",
    features: [
      "Responsive design",
      "Modern JavaScript frameworky",
      "Zobrazení na všech zařízeních",
    ],
    price: 12000,
    type: "main",
  },
  {
    title: "E-commerce řešení",
    description: "Funkční e-shop s platebními branami, správou objednávek a zákaznickou podporou.",
    features: [
      "Kompletní e-commerce řešení",
      "Platební brány",
      "Rozhraní pro správu obchodu",
    ],
    price: 20000,
    type: "main",
  },
  {
    title: "Back-end vývoj",
    description: "Tvorba back-endu s databází, API a server-side skriptováním.",
    features: [
      "Integrace databází",
      "API pro komunikaci",
      "Server-side skriptování",
    ],
    price: 18000,
    type: "main",
  },
  {
    title: "Full-stack vývoj",
    description: "Full-stack řešení od front-endu po back-end s integrovanými databázemi a API a dalšími funkcemi.",
    features: [
      "Front-end a back-end vývoj",
      "Integrace databází, API a službami třetích stran",
      "Kompletní řešení pro webové aplikace",
    ],
    price: 30000,
    type: "main",
  },

  // Additional Services (sorted by price)
  {
    title: "Integrace platebních bran",
    description: "Integrace platebních bran do mnou vytvořených webů a aplikací.",
    features: [
      "Popora pro hlavní platební brány (GoPay, Comgate, Stripe)",
      "Zabezpečené platby",
      "Včetně rozhraní pro správu a evidenci provozu brány",
    ],
    price: 2000,
    type: "additional",
  },
  {
    title: "Roční doména a hosting",
    description: "Registrace domény a hosting na rok",
    features: [
      "Registrace domény (cz, com, net, eu, sk)",
      "Hosting webu na rok",
      "Podpora a správa domény a hostingu",
    ],
    price: 2500,
    type: "additional",
  },
  {
    title: "Sociální sítě a integrace",
    description: "Integrace obsahu sociálních sítí s webovou stránkou a opačně.",
    features: [
      "Podpora pro Facebook, YouTube, LinkedIn, Instagram",
      "Sdílení obsahu z webu na sociální sítě a ze sítí na web",
      "Automatické aktualizace a synchronizace obsahu",
    ],
    price: 2500,
    type: "additional",
  },
  {
    title: "Oprava a údržba webu",
    description: "Správa webu, opravy chyb, kontrola zabezpečení a aktualizace.",
    features: [
      "Aktualizace webu",
      "Opravy chyb",
      "Bezpečnostní kontroly",
      "Zálohování a obnova dat",
    ],
    price: 4000,
    type: "additional",
  },
  {
    title: "Roční technická podpora",
    description: "ROční technická podpora a školení pro správu a údržbu webu nebo aplikace.",
    features: [
      "Technická podpora po telefonu nebo e-mailem",
      "Školení pro správu a údržbu webu",
      "Dokumentace a návody pro uživatele",
    ],
    price: 5000,
    type: "additional",
  },
  {
    title: "Optimalizace rychlosti webu",
    description: "Optimalizace rychlosti načítání webu a zlepšení výkonu.",
    features: [
      "Úprava zdrojových kódů webu",
      "Cache a optimalizace obrázků",
      "Minifikace a komprese souborů",
    ],
    price: 5000,
    type: "additional",
  },
  {
    title: "Nasazení webu na server",
    description: "Sestavení a nasazení webu na server s konfigurací a zabezpečením.",
    features: [
      "Konfigurace serveru a databáze",
      "Zabezpečení a šifrování dat",
      "Testování a kontrola funkčnosti",
    ],
    price: 7000,
    type: "additional",
  },
];

export default function Kalkulacka() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCardClick = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)  // Odebere službu, pokud je již vybraná
        : [...prev, service]  // Přidá službu, pokud není vybraná
    );
  };

  const calculatePrice = () => {
    return selectedServices.reduce((total, service) => {
      const selectedItem = cenikItems.find((item) => item.title === service);
      return selectedItem ? total + selectedItem.price : total;
    }, 0);
  };

  return (
    <div className="container mx-auto max-w-8xl px-4 md:px-6 py-10 rounded-lg shadow-xl flex">
      {/* Karty se službami */}
      <div className="flex-1 mr-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Kalkulátor služeb</h1>
        <p className="text-lg mb-6 text-center text-white">
          Vyberte služby, které chcete, a kalkulačka vám spočítá cenu.
        </p>

        {/* Sekce pro hlavní služby */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Hlavní služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cenikItems
              .filter(item => item.type === "main")
              .map((item) => (
                <Card
                  key={item.title}
                  className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform ${selectedServices.includes(item.title)
                    ? "bg-primary text-black scale-105"
                    : "hover:shadow-xl"
                  }`}
                  onClick={() => handleCardClick(item.title)}  // Přidání/odebrání služby po kliknutí
                >
                  <h4 className={`text-xl font-semibold mt-4 ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>
                    {item.title}
                  </h4>
                  <p className={`mt-2 text-sm ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>
                    {item.description}
                  </p>
                  <ul className="mt-4 text-left text-sm text-white space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`h-5 w-5 ${selectedServices.includes(item.title) ? "text-black" : "text-primary"}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`mt-2 text-sm ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-bold text-center text-xl">
                    <span className={`${selectedServices.includes(item.title) ? "text-black" : "text-primary"}`}>
                      {formatNumber(item.price, { style: "currency", currency: "CZK" })}
                    </span>
                  </p>
                </Card>
              ))}
          </div>
        </section>

        {/* Sekce pro doplňkové služby */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Doplňkové služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cenikItems
              .filter(item => item.type === "additional")
              .map((item) => (
                <Card
                  key={item.title}
                  className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform ${selectedServices.includes(item.title)
                    ? "bg-primary text-black scale-105"
                    : "hover:shadow-xl"
                  }`}
                  onClick={() => handleCardClick(item.title)}  // Přidání/odebrání služby po kliknutí
                >
                  <h4 className={`text-xl font-semibold mt-4 ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>
                    {item.title}
                  </h4>
                  <p className={`mt-2 text-sm ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>
                    {item.description}
                  </p>
                  <ul className="mt-4 text-left text-sm text-white space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`h-5 w-5 ${selectedServices.includes(item.title) ? "text-black" : "text-primary"}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`mt-2 text-sm ${selectedServices.includes(item.title) ? "text-black" : "text-white"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-bold text-center text-xl">
                    <span className={`${selectedServices.includes(item.title) ? "text-black" : "text-primary"}`}>
                      {formatNumber(item.price, { style: "currency", currency: "CZK" })}
                    </span>
                  </p>
                </Card>
              ))}
          </div>
        </section>
      </div>

      {/* Sticky panel pro celkovou cenu */}
      <div className="sticky top-24 w-80 p-6 rounded-lg h-[120px]">
        <h3 className="text-2xl font-semibold">Celková cena</h3>
        <p className="text-3xl mt-4 text-primary font-bold">
          {formatNumber(calculatePrice(), { style: "currency", currency: "CZK" })}
        </p>
      </div>
    </div>
  );
}
