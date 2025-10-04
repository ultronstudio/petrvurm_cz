"use client";

import { useMemo, useState } from "react";
import { Card } from "@radix-ui/themes";

// ===== Typy & helpery =====
type ItemType = "doucovani" | "skoleni" | "kurz";
type Unit = "hod" | "lekce" | "osoba";

interface CenikItem {
  title: string;
  description: string;
  basePrice: number;     // základ za jednotku
  isOffered?: boolean;
  type: ItemType;
  pricePerWhat: Unit;
  maxCapacity: number;   // max počet jednotek
  minParticipants?: number;
}

function formatNumber(n: number, opt: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0, ...opt }).format(n);
}

const UNIT_LABEL: Record<Unit, { single: string; plural: string }> = {
  hod:   { single: "hodina", plural: "hodin" },
  lekce: { single: "lekce", plural: "lekcí" },
  osoba: { single: "osoba", plural: "osoby" },
};

// ===== Data =====
const cenikItems: CenikItem[] = [
  {
    title: "Programování v C#",
    description: "Doučování programování v jazyce C# pro začátečníky i pokročilé.",
    basePrice: 300,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Tvorba statických webů",
    description: "HTML, CSS a JavaScript – základy pro funkční prezentace.",
    basePrice: 250,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Tvorba webových aplikací",
    description: "Moderní stack (Laravel, Next.js aj.), postup od návrhu k nasazení.",
    basePrice: 350,
    isOffered: true,
    type: "doucovani",
    pricePerWhat: "hod",
    maxCapacity: 10,
  },
  {
    title: "Jak na SEO",
    description: "Základy SEO a obsah, který se vyhledává. Vhodné pro týmy i jednotlivce.",
    basePrice: 1500,
    isOffered: false, // nyní nevypisujeme
    type: "kurz",
    pricePerWhat: "osoba",
    maxCapacity: 15,
    minParticipants: 30,
  },
];

// ===== Komponenta =====
export default function KalkulackaUceni() {
  const [selected, setSelected] = useState<string | null>(null); // vždy 1 služba
  const selectedItem = useMemo(
    () => cenikItems.find((i) => i.title === selected) ?? null,
    [selected]
  );

  // počet jednotek (hod/lekce/osoba) – clamp podle zvolené služby
  const [qty, setQty] = useState<number>(1);
  const maxCap = selectedItem?.maxCapacity ?? 1;
  const unit: Unit = selectedItem?.pricePerWhat ?? "hod";

  // slevové pásmo (transparentně a prediktivně)
  const discountMultiplier = qty >= 5 ? 0.85 : qty >= 2 ? 0.9 : 1;
  const discountLabel =
    qty >= 5 ? "Sleva 15 % (5+ jednotek)" : qty >= 2 ? "Sleva 10 % (2+ jednotek)" : null;

  const doucovani = cenikItems.filter((i) => i.type === "doucovani" && i.isOffered);
  const skoleni   = cenikItems.filter((i) => i.type === "skoleni"   && i.isOffered);
  const kurzy     = cenikItems.filter((i) => i.type === "kurz"      && i.isOffered);

  const toggleSelect = (title: string) => {
    setSelected((prev) => (prev === title ? null : title));
    setQty(1); // reset množství při změně služby
  };

  const subtotal = selectedItem ? selectedItem.basePrice * qty : 0;
  const total = Math.round(subtotal * discountMultiplier);

  const unitText =
    qty === 1 ? UNIT_LABEL[unit].single : UNIT_LABEL[unit].plural;

  const generateMailtoLink = () => {
    if (!selectedItem) return "#";
    const subject = encodeURIComponent("Poptávka doučování / školení – rychlý odhad");
    const body = encodeURIComponent(
`Dobrý den,

mám zájem o:
• ${selectedItem.title} – ${qty} ${unitText}
• Sazba: ${formatNumber(selectedItem.basePrice, { style: "currency", currency: "CZK" })}/${unit}
• Odhad: ${formatNumber(total, { style: "currency", currency: "CZK" })}${discountMultiplier < 1 ? ` (před slevou ${formatNumber(Math.round(subtotal), { style: "currency", currency: "CZK" })})` : ""}

Prosím o návrh možných termínů a organizačních detailů.
Děkuji.`
    );
    return `mailto:kontakt@petrvurm.cz?subject=${subject}&body=${body}`;
  };

  const ServiceCard = ({ item }: { item: CenikItem }) => {
    const active = selected === item.title;
    return (
      <Card
        key={item.title}
        className={`relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition
          ${active ? "ring-2 ring-primary scale-[1.02]" : "hover:border-white/20 hover:shadow-lg"}`}
        onClick={() => toggleSelect(item.title)}
        role="button"
        aria-pressed={active}
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleSelect(item.title)}
      >
        <div className="flex items-start justify-between">
          <h4 className={`text-lg font-semibold ${active ? "text-primary" : "text-white"}`}>
            {item.title}
          </h4>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary">
            {item.pricePerWhat}
          </span>
        </div>
        <p className="mt-2 text-sm text-white/80">{item.description}</p>
        {item.minParticipants && (
          <div className="mt-3 text-[11px] text-amber-300">
            Minimálně {item.minParticipants} účastníků
          </div>
        )}
        <div className="mt-5 text-xl font-bold">
          <span className="text-primary">
            {formatNumber(item.basePrice, { style: "currency", currency: "CZK" })}
          </span>
          <span className="text-white/60 text-sm"> / {item.pricePerWhat}</span>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto max-w-8xl px-4 md:px-6 py-10">
      <div className="flex">
        {/* levý sloupec */}
        <div className="flex-1 xl:mr-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-primary">
            Kalkulátor doučování{skoleni.length ? ", školení" : ""}{kurzy.length ? ", kurzů" : ""}
          </h1>
          <p className="text-base mb-6 text-center text-white/80">
            Vyberte službu a počet jednotek. Cena je orientační; potvrdíme ji po krátké konzultaci.
          </p>

          {/* Doučování */}
          {doucovani.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Doučování</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doucovani.map((i) => <ServiceCard key={i.title} item={i} />)}
              </div>
            </section>
          )}

          {/* Školení */}
          {skoleni.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Školení</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skoleni.map((i) => <ServiceCard key={i.title} item={i} />)}
              </div>
            </section>
          )}

          {/* Kurzy */}
          {kurzy.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Kurzy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kurzy.map((i) => <ServiceCard key={i.title} item={i} />)}
              </div>
            </section>
          )}

          <div className="p-4 border border-amber-400/40 text-amber-200 text-sm rounded-lg mb-4">
            Ceny doučování jsou orientační a vycházejí ze zvoleného rozsahu.
            {kurzy.length > 0 &&
              " U vypsaných kurzů může být stanovena minimální kapacita. Při nenaplnění se uhrazené částky vrací v plné výši."}
          </div>
        </div>

        {/* pravý sticky panel – desktop */}
        <div className="sticky top-24 w-80 p-6 rounded-2xl h-fit hidden xl:block border border-white/10 bg-white/5 backdrop-blur">
          <h3 className="text-2xl font-semibold">Rekapitulace</h3>

          {!selectedItem ? (
            <p className="mt-3 text-sm text-white/70">Zatím není vybrána žádná služba.</p>
          ) : (
            <>
              <ul className="mt-3 text-sm text-white/80 space-y-1">
                <li><span className="text-white">Služba:</span> {selectedItem.title}</li>
                <li><span className="text-white">Jednotka:</span> {selectedItem.pricePerWhat}</li>
              </ul>

              {/* Slider */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>
                    Počet {unit === "hod" ? "hodin" : unit === "lekce" ? "lekcí" : "osob"}
                  </span>
                  <span>{qty}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={maxCap}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                {discountLabel && (
                  <div className="mt-1 text-xs text-emerald-300">{discountLabel}</div>
                )}
              </div>

              {/* Cena */}
              <div className="mt-4">
                <div className="text-3xl font-bold text-primary">
                  {formatNumber(total, { style: "currency", currency: "CZK" })}
                </div>
                {discountMultiplier < 1 && (
                  <div className="text-sm text-white/60">
                    <span className="line-through mr-1">
                      {formatNumber(Math.round(subtotal), { style: "currency", currency: "CZK" })}
                    </span>
                    po slevě
                  </div>
                )}
              </div>

              <a
                href={generateMailtoLink()}
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
              >
                Nezávazně kontaktovat
              </a>
            </>
          )}
        </div>
      </div>

      {/* mobilní footer panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111113] border-t border-white/10 p-4 block xl:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Orientační cena</h3>
            <div className="text-2xl text-primary font-bold">
              {selectedItem
                ? formatNumber(total, { style: "currency", currency: "CZK" })
                : "0 Kč"}
            </div>
            {selectedItem && discountMultiplier < 1 && (
              <div className="text-[11px] text-white/70">
                Před slevou{" "}
                <span className="line-through">
                  {formatNumber(Math.round(subtotal), { style: "currency", currency: "CZK" })}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-[200px]">
            {selectedItem && (
              <>
                <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                  <span>
                    Počet {unit === "hod" ? "hodin" : unit === "lekce" ? "lekcí" : "osob"}
                  </span>
                  <span>{qty}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={maxCap}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <a
                  href={generateMailtoLink()}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
                >
                  Nezávazně kontaktovat
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
