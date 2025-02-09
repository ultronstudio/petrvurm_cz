"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";

interface CenikItemProps {
  title: string;
  description: string;
  features: string[];
  price: number;
  type?: "main" | "additional"; // Typ služby (hlavní nebo doplňková)
  isOffered?: boolean;  // Zda je služba aktuálně nabízena
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

const cenikItems = [
  // Hlavní služby
  {
    title: "Zlepšení pozice ve vyhledávačích (SEO)",
    description: "Pomohu vašemu webu získat lepší pozici ve vyhledávačích.",
    features: [
      "Analýza aktuální situace webu",
      "Úprava textů a klíčových slov",
      "Zvýšení viditelnosti ve vyhledávačích",
    ],
    price: 4000,
    type: "main",
    isOffered: true
  },
  {
    title: "Tvorba moderního designu webu",
    description: "Navrhnu atraktivní a přehledný vzhled pro váš web.",
    features: [
      "Responzivní design pro všechna zařízení",
      "Rychlé načítání stránek",
      "Moderní technologie",
    ],
    price: 6000,
    type: "main",
    isOffered: false
  },
  {
    title: "Vytvoření internetového obchodu",
    description: "Kompletní řešení pro prodej online.",
    features: [
      "Funkční e-shop",
      "Online platby",
      "Systém pro správu objednávek",
    ],
    price: 10000,
    type: "main",
    isOffered: false
  },
  {
    title: "Kompletní tvorba webu na míru",
    description: "Postarám se o vše od návrhu až po spuštění webu.",
    features: [
      "Návrh vzhledu i funkčnosti",
      "Technické zajištění",
      "Napojení na externí systémy",
    ],
    price: 15000,
    type: "main",
    isOffered: true
  },

  // Další služby
  {
    title: "Přidání platební brány",
    description: "Umožněte zákazníkům platit online.",
    features: [
      "Podpora platebních bran (GoPay, Comgate, Stripe)",
      "Zabezpečené platby",
      "Snadná správa plateb",
    ],
    price: 1000,
    type: "additional",
    isOffered: true
  },
  {
    title: "Registrace domény a hosting na rok",
    description: "Zajistím webovou adresu a místo na serveru.",
    features: [
      "Registrace domény (např. .cz, .com, atd.)",
      "Hosting na spolehlivém serveru",
      "Správa domény a hostingu",
    ],
    price: 1500,
    type: "additional",
    isOffered: true
  },
  {
    title: "Propojení se sociálními sítěmi",
    description: "Zajistím sdílení mezi webem a sociálními sítěmi.",
    features: [
      "Podpora Facebooku, Instagramu, YouTube apod.",
      "Automatické aktualizace obsahu",
      "Synchronizace příspěvků",
    ],
    price: 2000,
    type: "additional",
    isOffered: false
  },
  {
    title: "Údržba a opravy webu",
    description: "Postarám se o váš web, aby fungoval bez problémů.",
    features: [
      "Pravidelné aktualizace",
      "Opravy případných chyb",
      "Zabezpečení a zálohování",
    ],
    price: 2000,
    type: "additional",
    isOffered: true
  },
  {
    title: "Technická podpora na rok",
    description: "Pomohu vám s webem po celý rok.",
    features: [
      "Telefonická a e-mailová podpora",
      "Školení pro správu webu",
      "Podrobné návody",
    ],
    price: 2500,
    type: "additional",
    isOffered: true
  },
  {
    title: "Zrychlení načítání webu",
    description: "Zlepším rychlost a výkon vašeho webu.",
    features: [
      "Optimalizace kódu a obrázků",
      "Nastavení cache",
      "Zmenšení velikosti souborů",
    ],
    price: 2500,
    type: "additional",
    isOffered: true
  },
  {
    title: "Spuštění webu na serveru",
    description: "Postarám se o vše potřebné ke spuštění webu.",
    features: [
      "Nastavení serveru a webu",
      "Zabezpečení všech dat",
      "Testování funkčnosti",
    ],
    price: 3500,
    type: "additional",
    isOffered: true
  },
];

export default function Kalkulacka() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCardClick = (service: string) => {
    const isMainCompleteService = service === "Kompletní tvorba webu na míru";

    setSelectedServices((prev) => {
      if (isMainCompleteService) {
        // Pokud vybíráme "Kompletní tvorba webu na míru", odebereme pouze doplňkové služby
        return prev.includes(service)
          ? prev.filter((s) => s !== service) // Odebrat kompletní službu
          : [service, ...prev.filter((s) => cenikItems.find((item) => item.title === s)?.type === "main")]; // Přidat a ponechat hlavní služby
      }

      // Pokud je již vybrána "Kompletní tvorba webu na míru", nedovolit doplňkové služby
      if (prev.includes("Kompletní tvorba webu na míru")) {
        const isAdditionalService = cenikItems.find((item) => item.title === service)?.type === "additional";
        if (isAdditionalService) return prev;
      }

      // Jinak přidat/odebrat vybranou službu
      return prev.includes(service)
        ? prev.filter((s) => s !== service) // Odebere službu
        : [...prev, service]; // Přidá službu
    });
  };

  const calculatePrice = () => {
    return selectedServices.reduce((total, service) => {
      const selectedItem = cenikItems.find((item) => item.title === service);
      return selectedItem ? total + selectedItem.price : total;
    }, 0);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent("Zájem o Vaše služby");
    const body = encodeURIComponent(
      `Dobrý den,\nmám zájem o následující služby:\n\n${selectedServices
        .map((service) => `- ${service}`)
        .join("\n")}\n\nRád bych se dozvěděl více informací o cenách a podmínkách. Děkuji a těším se na odpověď.`
    );

    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
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
              .filter(item => item.type === "main" && item.isOffered) // Přidáno `&& item.isOffered`
              .map((item) => (
                <Card
                  key={item.title}
                  className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform cursor-pointer ${selectedServices.includes(item.title)
                    ? "bg-primary text-black scale-105"
                    : "hover:shadow-xl"
                    }`}
                  onClick={() => handleCardClick(item.title)}
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
                      od&nbsp;{formatNumber(item.price, { style: "currency", currency: "CZK" })}
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
              .filter(item => item.type === "additional" && item.isOffered) // Přidáno `&& item.isOffered`
              .map((item) => (
                <Card
                  key={item.title}
                  className={`p-6 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform cursor-pointer ${selectedServices.includes(item.title)
                    ? "bg-primary text-black scale-105"
                    : selectedServices.includes("Kompletní tvorba webu na míru")
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-xl"
                    }`}
                  onClick={() => !selectedServices.includes("Kompletní tvorba webu na míru") && handleCardClick(item.title)}
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
                      od&nbsp;{formatNumber(item.price, { style: "currency", currency: "CZK" })}
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
          {selectedServices.length === 0 ? "0 Kč" : "od " + formatNumber(calculatePrice(), { style: "currency", currency: "CZK" })}
        </p>

        {selectedServices.length > 0 && (
          <a href={generateMailtoLink()} className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/70 hover:text-white focus:outline-none focus:ring-2 mt-2">
            Nezávazně kontaktovat
          </a>
        )}
      </div>
    </div>
  );
}
