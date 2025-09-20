"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";

type ServiceType = "main" | "additional";
type AdditionalGroup = "Provoz" | "Marketing" | "Vývoj & integrace";

interface CenikItem {
  title: string;
  description: string;
  features: string[];
  price: number;               // minimální cena („od“)
  type: ServiceType;
  isOffered?: boolean;
  period?: string;             // např. "/ měsíc", "/ rok"
  group?: AdditionalGroup;     // jen pro type === "additional"
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

const cenikItems: CenikItem[] = [
  // ===== Hlavní služby =====
  {
    title: "Tvorba jednoduchého portfolia",
    description: "Vytvořím jednoduchý web, který bude reprezentovat vaši osobu nebo firmu.",
    features: [
      "Jednoduchý a moderní design",
      "Základní informace o vás nebo vaší firmě",
      "Kontaktní formulář s odesláním na e-mail",
    ],
    price: 5000,
    type: "main",
    isOffered: true,
  },
  {
    title: "Optimalizace a SEO balíček",
    description: "Pomohu vašemu webu získat lepší pozice ve vyhledávačích.",
    features: ["Analýza aktuálního stavu", "Úprava textů a klíčových slov", "Zlepšení indexace a viditelnosti"],
    price: 7500,
    type: "main",
    isOffered: true,
  },
  {
    title: "Kompletní firemní web na míru",
    description: "Postarám se o vše od návrhu až po spuštění webu.",
    features: ["Návrh vzhledu i funkčnosti", "Technické zajištění", "Napojení na externí systémy"],
    price: 25000,
    type: "main",
    isOffered: true,
  },
  {
    title: "E-shop na míru",
    description: "Kompletní řešení pro online prodej.",
    features: ["Katalog produktů a košík", "Platební brány", "Doprava a fakturace", "WooCommerce, Shoptet nebo vlastní řešení"],
    price: 20000,
    type: "main",
    isOffered: true,
  },

  // ===== Doplňkové služby — Provoz =====
  {
    title: "Přidání platební brány",
    description: "Umožněte zákazníkům platit online (GoPay, Comgate, Stripe).",
    features: ["Karty, Apple/Google Pay", "Zabezpečené platby", "Nastavení notifikací"],
    price: 3000,
    type: "additional",
    group: "Provoz",
    isOffered: true,
  },
  {
    title: "Registrace domény a hosting na rok",
    description: "Zajistím doménu i spolehlivý hosting.",
    features: ["Doména (.cz/.com/…)", "Hosting a SSL", "Základní správa"],
    price: 2500,
    type: "additional",
    group: "Provoz",
    isOffered: true,
    period: "/ rok",
  },
  {
    title: "Údržba a opravy webu (paušál)",
    description: "Pravidelné aktualizace, opravy chyb a zálohy.",
    features: ["Aktualizace systému a pluginů", "Monitoring", "Zálohování a obnova"],
    price: 1500,
    type: "additional",
    group: "Provoz",
    isOffered: true,
    period: "/ měsíc",
  },
  {
    title: "Spuštění webu na vašem serveru",
    description: "Nasazení, zabezpečení a finální testy.",
    features: ["Nastavení serveru", "HTTPS/SSL, zálohy", "Testování funkčnosti"],
    price: 4500,
    type: "additional",
    group: "Provoz",
    isOffered: true,
  },
  {
    title: "Technická podpora",
    description: "Konzultace, školení a řešení ad-hoc problémů.",
    features: ["Telefon/e-mail", "Krátké školení administrace", "Základní dokumentace"],
    price: 5000,
    type: "additional",
    group: "Provoz",
    isOffered: true,
    period: "/ rok",
  },

  // ===== Doplňkové služby — Marketing =====
  {
    title: "Zrychlení načítání webu",
    description: "Výkonová optimalizace pro lepší UX a SEO.",
    features: ["Optimalizace obrázků a kódu", "Cache, lazy-loading", "Minifikace a komprese"],
    price: 4000,
    type: "additional",
    group: "Marketing",
    isOffered: true,
  },
  {
    title: "Copywriting a texty pro web",
    description: "Srozumitelné a SEO-friendly texty.",
    features: ["Firemní prezentace", "Landing page texty", "Korektura"],
    price: 2500,
    type: "additional",
    group: "Marketing",
    isOffered: true,
  },
  {
    title: "E-mail marketing a newslettery",
    description: "Nastavení nástroje, šablony a automatizace.",
    features: ["Základní šablony", "Double-opt-in", "Automatické kampaně"],
    price: 4000,
    type: "additional",
    group: "Marketing",
    isOffered: true,
  },

  // ===== Doplňkové služby — Vývoj & integrace =====
  {
    title: "Integrace externích systémů (CRM, fakturace, API)",
    description: "Propojení webu s nástroji, které už používáte.",
    features: ["Analýza požadavků", "Implementace a testy", "Základní dokumentace"],
    price: 6000,
    type: "additional",
    group: "Vývoj & integrace",
    isOffered: true,
  },
];

export default function KalkulackaWeb() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCardClick = (service: string) => {
    const fullService = "Kompletní firemní web na míru"; // název přesně jako v datech

    setSelectedServices((prev) => {
      if (service === fullService) {
        // vybráním full-service vymažeme jen doplňkové služby
        return prev.includes(service)
          ? prev.filter((s) => s !== service)
          : [service, ...prev.filter((s) => cenikItems.find((i) => i.title === s)?.type === "main")];
      }

      // když je zvolen full-service, blokuj additional
      if (prev.includes(fullService)) {
        const isAdditional = cenikItems.find((i) => i.title === service)?.type === "additional";
        if (isAdditional) return prev;
      }

      return prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service];
    });
  };

  const calculatePrice = () =>
    selectedServices.reduce((sum, s) => {
      const it = cenikItems.find((i) => i.title === s);
      return it ? sum + it.price : sum;
    }, 0);

  const generateMailtoLink = () => {
    const subject = encodeURIComponent("Zájem o Vaše služby");
    const body = encodeURIComponent(
      `Dobrý den,\n\nmám zájem o následující služby:\n${selectedServices
        .map((s) => `• ${s}`)
        .join("\n")}\n\nOdhad celkem: od ${formatNumber(calculatePrice(), {
        style: "currency",
        currency: "CZK",
      })}\n\nProsím o zpřesnění nabídky a volné termíny.\nDěkuji.`
    );
    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  };

  const renderCard = (item: CenikItem) => {
    const selected = selectedServices.includes(item.title);
    const blocked =
      selectedServices.includes("Kompletní firemní web na míru") && item.type === "additional";

    return (
      <Card
        key={item.title}
        className={`p-6 shadow-lg rounded-lg transition-all duration-300 transform cursor-pointer ${
          selected ? "bg-primary text-black scale-105" : blocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
        }`}
        onClick={() => !blocked && handleCardClick(item.title)}
      >
        <h4 className={`text-xl font-semibold mt-1 ${selected ? "text-black" : "text-white"}`}>{item.title}</h4>
        <p className={`mt-2 text-sm ${selected ? "text-black" : "text-white/90"}`}>{item.description}</p>
        <ul className="mt-4 text-left text-sm text-white space-y-2">
          {item.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className={`h-5 w-5 ${selected ? "text-black" : "text-primary"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className={`${selected ? "text-black" : "text-white"}`}>{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-bold text-center text-xl">
          <span className={`${selected ? "text-black" : "text-primary"}`}>
            od {formatNumber(item.price, { style: "currency", currency: "CZK" })} {item.period ?? ""}
          </span>
        </p>
      </Card>
    );
  };

  // skupiny pro doplňkové
  const additionalGroups: AdditionalGroup[] = ["Provoz", "Marketing", "Vývoj & integrace"];

  return (
    <div className="container mx-auto max-w-8xl px-4 md:px-6 py-10 flex">
      {/* levý sloupec */}
      <div className="flex-1 xl:mr-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Kalkulátor služeb ohledně tvorby a údržby webu</h1>
        <p className="text-lg mb-6 text-center text-white">Vyberte služby, které chcete, a kalkulačka vám spočítá cenu.</p>

        {/* Hlavní služby */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Hlavní služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cenikItems.filter((i) => i.type === "main" && i.isOffered !== false).map(renderCard)}
          </div>
        </section>

        {/* Doplňkové služby (skupiny) */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-white">Doplňkové služby</h2>

          {additionalGroups.map((grp) => (
            <div key={grp}>
              <h3 className="text-xl font-semibold text-white/90 mb-3">{grp}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cenikItems
                  .filter((i) => i.type === "additional" && i.group === grp && i.isOffered !== false)
                  .map(renderCard)}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* pravý sticky panel – desktop */}
      <div className="sticky top-24 w-80 p-6 rounded-lg h-[140px] hidden xl:block">
        <h3 className="text-2xl font-semibold">Celková cena</h3>
        <p className="text-3xl mt-4 text-primary font-bold">
          {selectedServices.length === 0 ? "0 Kč" : "od " + formatNumber(calculatePrice(), { style: "currency", currency: "CZK" })}
        </p>

        {selectedServices.length > 0 && (
          <a
            href={generateMailtoLink()}
            className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/70 hover:text-white focus:outline-none focus:ring-2 mt-2"
          >
            Nezávazně kontaktovat
          </a>
        )}
      </div>

      {/* mobilní footer panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111113] p-4 block xl:hidden">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Celková cena</h3>
            <p className="text-3xl mt-1 text-primary font-bold">
              {selectedServices.length === 0 ? "0 Kč" : "od " + formatNumber(calculatePrice(), { style: "currency", currency: "CZK" })}
            </p>
          </div>
          <div>
            {selectedServices.length > 0 && (
              <a
                href={generateMailtoLink()}
                className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/70 hover:text-white focus:outline-none focus:ring-2"
              >
                Nezávazně kontaktovat
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
