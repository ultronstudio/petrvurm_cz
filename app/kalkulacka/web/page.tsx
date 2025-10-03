"use client";

import { useMemo, useState } from "react";
import { Card } from "@radix-ui/themes";
import { motion } from "framer-motion";

// ====== KONSTANTY / NASTAVENÍ ======
const HOURLY = 250; // Kč/h – základní sazba

// Typy
type ServiceType = "main" | "additional";
type AdditionalGroup = "Provoz" | "Marketing" | "Vývoj & integrace";

interface CenikItem {
  title: string;
  description: string;
  features: string[];
  price: number; // minimální cena ("od")
  type: ServiceType;
  isOffered?: boolean;
  period?: string; // např. "/ měsíc", "/ rok"
  group?: AdditionalGroup; // pouze pro doplňkové
  popular?: boolean; // vizuální badge „Nejčastější volba“
  badge?: string; // vlastní badge (např. „-20%“)
  estHours?: number; // orientační odhad pracnosti
  blocksAdditionals?: boolean; // pokud true, vyřadí další add‑on výběr
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

// ====== DATA – formální copy + upravené ceny ======
const cenikItems: CenikItem[] = [
  // ===== Hlavní služby =====
  {
    title: "Balíček Starter",
    description:
      "Jednostránková prezentace s důrazem na přehlednost a konverzi návštěvníků.",
    features: [
      "Responzivní návrh rozhraní",
      "Základní SEO a měření návštěvnosti",
      "Kontaktní formulář a e‑mailové notifikace",
    ],
    price: 3500,
    type: "main",
    badge: "SLEVA",
    estHours: 14,
  },
  {
    title: "Balíček Growth",
    description:
      "Vícestránkový web se sekcí novinek a formuláři. Vhodné pro menší a střední podniky.",
    features: [
      "Návrh informační architektury a UI",
      "CMS / blog, základní výkon a bezpečnost",
      "GDPR, cookie lišta a základní analytika",
    ],
    price: 12900,
    type: "main",
    popular: true,
    badge: "NEJČASTĚJŠÍ VOLBA",
    estHours: 52,
    blocksAdditionals: true,
  },
  {
    title: "Balíček Custom",
    description:
      "Zakázkový vývoj s vlastními komponentami a integracemi. Připravené pro budoucí rozšiřování.",
    features: [
      "Vlastní UI komponenty a layouty",
      "Napojení na externí systémy",
      "Performance budget a základní CI/CD",
    ],
    price: 21900,
    type: "main",
    estHours: 88,
    blocksAdditionals: true,
  },
  {
    title: "Balíček E‑shop",
    description:
      "Kompletní e‑commerce základ: katalog, košík, platby a fakturace.",
    features: [
      "Produkty, varianty a doprava",
      "Platební brány (GoPay / Comgate / Stripe)",
      "Základní šablony e‑mailů a faktur",
    ],
    price: 15900,
    type: "main",
    estHours: 70,
    blocksAdditionals: true,
  },

  // ===== Doplňkové – Provoz =====
  {
    title: "Připojení platební brány",
    description: "Implementace a zajištění bezpečné komunikace s poskytovatelem plateb.",
    features: ["Apple / Google Pay", "Webhooky a notifikace", "Testovací i produkční režim"],
    price: 2000,
    type: "additional",
    group: "Provoz",
    estHours: 8,
  },
  {
    title: "Doména, hosting a SSL (1 rok)",
    description: "Registrace domény, nastavení DNS, hosting a certifikát.",
    features: ["Doména .cz / .com", "Hosting a HTTPS/SSL", "Základní správa"],
    price: 1900,
    type: "additional",
    group: "Provoz",
    period: "/ rok",
    estHours: 6,
  },
  {
    title: "Paušální údržba a opravy",
    description: "Pravidelné aktualizace, monitoring a zálohování včetně obnovy.",
    features: ["Aktualizace systému a pluginů", "Monitoring", "Zálohování a obnova"],
    price: 990,
    type: "additional",
    group: "Provoz",
    period: "/ měsíc",
    estHours: 5,
  },
  {
    title: "Nasazení na vlastní server",
    description: "Hardening prostředí, HTTPS a finální funkční testy.",
    features: ["Konfigurace serveru", "HTTPS/SSL a zálohy", "Smoke testy"],
    price: 2500,
    type: "additional",
    group: "Provoz",
    estHours: 10,
  },
  {
    title: "Technická podpora",
    description: "Konzultace, zaškolení administrace a řešení ad‑hoc požadavků.",
    features: ["Telefon / e‑mail / videohovor", "Krátké zaškolení administrátora", "Základní dokumentace"],
    price: 2500,
    type: "additional",
    group: "Provoz",
    period: "/ rok",
    estHours: 10,
  },

  // ===== Doplňkové – Marketing =====
  {
    title: "Zrychlení načítání",
    description: "Výkonnostní optimalizace s ohledem na UX a SEO.",
    features: ["Optimalizace obrázků a kódu", "Cache, lazy‑loading", "Minifikace a komprese"],
    price: 2500,
    type: "additional",
    group: "Marketing",
    estHours: 10,
  },
  {
    title: "Copywriting a úprava textů",
    description: "Jasné, stylisticky jednotné a SEO‑přátelské texty.",
    features: ["Firemní prezentace", "Landing page", "Korektura"],
    price: 1500,
    type: "additional",
    group: "Marketing",
    estHours: 6,
  },
  {
    title: "E‑mailing a newsletter",
    description: "Nastavení systému, šablon a základních automatizací.",
    features: ["Základní šablony", "Double opt‑in", "Automatická kampaň"],
    price: 2500,
    type: "additional",
    group: "Marketing",
    estHours: 10,
  },

  // ===== Doplňkové – Vývoj & integrace =====
  {
    title: "Integrace externích systémů (CRM, fakturace, API)",
    description: "Napojení webu na používané nástroje včetně testů a dokumentace.",
    features: ["Analýza požadavků", "Implementace a testování", "Základní dokumentace"],
    price: 3900,
    type: "additional",
    group: "Vývoj & integrace",
    estHours: 16,
  },
];

export default function KalkulackaWeb() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const fullServiceTitles = useMemo(
    () => cenikItems.filter((i) => i.type === "main" && i.blocksAdditionals).map((i) => i.title),
    []
  );

  const handleCardClick = (service: string) => {
    const isFullService = fullServiceTitles.includes(service);

    setSelectedServices((prev) => {
      if (isFullService) {
        return prev.includes(service)
          ? prev.filter((s) => s !== service)
          : [service, ...prev.filter((s) => cenikItems.find((i) => i.title === s)?.type === "main")];
      }
      if (prev.some((s) => fullServiceTitles.includes(s))) {
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

  const estimateHours = () =>
    selectedServices.reduce((sum, s) => {
      const it = cenikItems.find((i) => i.title === s);
      return it?.estHours ? sum + it.estHours : sum;
    }, 0);

  const generateMailtoLink = () => {
    const subject = encodeURIComponent("Nezávazná poptávka – orientační kalkulace");
    const hours = estimateHours();
    const price = calculatePrice();
    const body = encodeURIComponent(
      `Dobrý den,\n\nna základě kalkulátoru poptávám následující služby:\n${selectedServices
        .map((s) => `• ${s}`)
        .join("\n")}\n\nOrientační cena: od ${formatNumber(price, {
        style: "currency",
        currency: "CZK",
      })}\nOrientační pracnost: ≈ ${hours} h × ${HOURLY} Kč/h\n\nProsím o návrh termínu krátké konzultace (cca 15 min) a upřesnění nabídky.\nDěkuji.`
    );
    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  };

  const renderBadge = (item: CenikItem) => {
    if (item.popular)
      return (
        <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold bg-primary/15 text-primary ring-1 ring-primary/30">
          Nejčastější volba
        </span>
      );
    if (item.badge)
      return (
        <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold bg-primary/15 text-primary ring-1 ring-primary/30">
          {item.badge}
        </span>
      );
    return null;
  };

  const renderCard = (item: CenikItem, idx?: number) => {
    const selected = selectedServices.includes(item.title);
    const anyFullSelected = selectedServices.some((s) => fullServiceTitles.includes(s));
    const blocked = anyFullSelected && item.type === "additional";

    return (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: (idx ?? 0) * 0.03 }}
        whileHover={{ y: -3 }}
      >
        <Card
          className={`p-6 rounded-2xl transition-all duration-300 transform cursor-pointer border backdrop-blur ${
            selected
              ? "bg-primary text-black scale-[1.03] border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              : blocked
              ? "opacity-50 cursor-not-allowed border-white/5"
              : "hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-white/20"
          }`}
          onClick={() => !blocked && handleCardClick(item.title)}
        >
          <div className="flex items-center justify-between">
            <h4 className={`text-xl font-semibold mt-1 tracking-tight ${selected ? "text-black" : "text-white"}`}>
              {item.title}
            </h4>
            {renderBadge(item)}
          </div>
          <p className={`mt-2 text-sm leading-6 ${selected ? "text-black/80" : "text-white/90"}`}>
            {item.description}
          </p>
          <ul className="mt-4 text-left text-sm space-y-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 ${selected ? "text-black" : "text-primary"}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className={`${selected ? "text-black" : "text-white"}`}>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-end justify-between">
            <p className="font-bold text-xl">
              <span className={`${selected ? "text-black" : "text-primary"}`}>
                od {formatNumber(item.price, { style: "currency", currency: "CZK" })} {item.period ?? ""}
              </span>
            </p>
            {item.estHours && (
              <p className={`text-xs ${selected ? "text-black/70" : "text-white/60"}`}>≈ {item.estHours} h práce</p>
            )}
          </div>
        </Card>
      </motion.div>
    );
  };

  const additionalGroups: AdditionalGroup[] = ["Provoz", "Marketing", "Vývoj & integrace"];

  const totalPrice = calculatePrice();
  const hours = estimateHours();

  return (
    <div className="relative">
      <div className="container mx-auto max-w-8xl px-4 md:px-6 py-12 flex">
        {/* levý sloupec */}
        <div className="flex-1 xl:mr-8">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-2 text-center text-primary tracking-tight"
          >
            Kalkulátor služeb pro web
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-base mb-8 text-center text-white/80"
          >
            Zvolte požadované služby. Uvedené částky jsou orientační a budou potvrzeny po krátké konzultaci (cca 15 minut).
            Základní sazba činí <strong>{HOURLY} Kč/h</strong>.
          </motion.p>

          {/* Hlavní služby */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Hlavní služby</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cenikItems
                .filter((i) => i.type === "main" && i.isOffered !== false)
                .map((item, i) => renderCard(item, i))}
            </div>
          </section>

          {/* Doplňkové služby (skupiny) */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-white">Doplňkové služby</h2>
            {additionalGroups.map((grp, gi) => (
              <div key={grp}>
                <h3 className="text-xl font-semibold text-white/90 mb-3">{grp}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cenikItems
                    .filter((i) => i.type === "additional" && i.group === grp && i.isOffered !== false)
                    .map((item, i) => renderCard(item, gi * 10 + i))}
                </div>
              </div>
            ))}
          </section>

          {/* Mini‑FAQ / důvěra */}
          <section className="mt-12 grid gap-4 md:grid-cols-3 text-sm text-white/80">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
              <h4 className="font-semibold mb-1">Vznik ceny</h4>
              <p>
                Balíčky slouží jako orientační rámec. Na základě specifikace stanovím odhad pracnosti (viz výběr) × {HOURLY} Kč/h.
                Finální cena je potvrzena ve smlouvě před zahájením realizace.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
              <h4 className="font-semibold mb-1">Průběh spolupráce</h4>
              <p>
                Úvodní schůzka → návrh řešení → první verze → iterace → nasazení → následná údržba. O průběhu pravidelně informuji.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
              <h4 className="font-semibold mb-1">Fakturace a záloha</h4>
              <p>
                Před zahájením prací se hradí záloha ve výši 30 % z dohodnuté ceny. Doplatek probíhá po předání díla.
                Skryté poplatky nejsou uplatňovány.
              </p>
            </div>
          </section>
        </div>

        {/* pravý sticky panel – desktop */}
        <motion.aside
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-24 w-80 p-6 rounded-2xl h-fit hidden xl:block border border-white/10 bg-white/5 backdrop-blur"
        >
          <h3 className="text-2xl font-semibold">Rekapitulace</h3>
          <ul className="mt-2 text-sm text-white/80 space-y-1 list-disc list-inside">
            {selectedServices.length === 0 ? (
              <li>Zatím nebyla zvolena žádná položka</li>
            ) : (
              selectedServices.map((s) => <li key={s}>{s}</li>)
            )}
          </ul>
          <div className="mt-4 text-sm text-white/80">
            <div>Odhad pracnosti: <strong>≈ {hours} h</strong></div>
            <div>Hodinová sazba: <strong>{HOURLY} Kč/h</strong></div>
          </div>
          <p className="text-3xl mt-2 text-primary font-bold">
            {selectedServices.length === 0 ? "0 Kč" : "od " + formatNumber(totalPrice, { style: "currency", currency: "CZK" })}
          </p>

          {selectedServices.length > 0 && (
            <a
              href={generateMailtoLink()}
              className="transition-all duration-300 inline-flex items-center justify-center w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 mt-3"
            >
              Domluvit 15min konzultaci
            </a>
          )}
          <p className="text-xs text-white/60 mt-2">Po odeslání rekapitulace obdržíte potvrzení s návrhem termínu.</p>
        </motion.aside>
      </div>

      {/* mobilní footer panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111113]/95 backdrop-blur border-t border-white/10 p-4 block xl:hidden">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h3 className="text-base font-semibold">Orientační cena</h3>
            <p className="text-2xl mt-1 text-primary font-bold">
              {selectedServices.length === 0
                ? "0 Kč"
                : "od " + formatNumber(totalPrice, { style: "currency", currency: "CZK" })}
            </p>
            <p className="text-xs text-white/60">≈ {hours} h × {HOURLY} Kč/h</p>
          </div>
          <div>
            {selectedServices.length > 0 && (
              <a
                href={generateMailtoLink()}
                className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2"
              >
                Domluvit konzultaci
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
