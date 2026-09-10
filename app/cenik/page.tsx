import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BASE_HOURLY_RATE, BASE_PROJECT_RATES, formatFromPrice } from '@/lib/pricing';

const packages = [
  {
    name: 'Web Start',
    price: formatFromPrice(BASE_PROJECT_RATES.webStart),
    audience: 'Jednoduchý profesionální one-page web, landing page nebo menší prezentace služby.',
    includes: ['Úvodní konzultace', 'Návrh struktury', 'Responzivní zpracování', 'Základní SEO a výkon', 'Kontaktní CTA nebo formulář', 'Nasazení a základní předání'],
    drivers: 'Rozsah obsahu, grafické podklady a případné integrace.',
  },
  {
    name: 'Firemní web',
    price: formatFromPrice(BASE_PROJECT_RATES.businessWeb),
    audience: 'Menší až střední firemní prezentace s více obsahem a jasnou strukturou nabídky.',
    includes: ['Více podstránek', 'Individuální struktura', 'Responzivní implementace', 'SEO základy', 'Kontaktní prvky', 'Nasazení a předání'],
    drivers: 'Počet typů stránek, množství obsahu, formuláře a napojení služeb.',
  },
  {
    name: 'Firemní web Plus / CMS',
    price: formatFromPrice(BASE_PROJECT_RATES.cmsWeb),
    audience: 'Web, jehož obsah potřebujete průběžně upravovat bez zásahu vývojáře.',
    includes: ['Více podstránek', 'CMS nebo jiný editovatelný obsah', 'Pokročilejší SEO', 'Integrace', 'Individuální komponenty', 'Předání správy'],
    drivers: 'Rozsah administrace, datový model, role uživatelů a integrace.',
  },
  {
    name: 'E-shop',
    price: formatFromPrice(BASE_PROJECT_RATES.shop),
    audience: 'Prodej produktů nebo služeb online s řešením vybraným podle konkrétního provozu.',
    includes: ['Návrh struktury obchodu', 'Katalog a produktové stránky', 'Objednávkový proces', 'Responzivní rozhraní', 'Základní technické SEO', 'Nasazení'],
    drivers: 'Počet produktů, platby, doprava, skladové systémy a další integrace.',
  },
  {
    name: 'Webová aplikace / MVP',
    price: formatFromPrice(BASE_PROJECT_RATES.webApp),
    audience: 'Aplikace s vlastní logikou, databází, uživatelskými účty nebo napojením na API.',
    includes: ['Upřesnění požadavků', 'Návrh architektury', 'Implementace klíčových funkcí', 'Testování', 'Nasazení', 'Zdrojový kód a předání'],
    drivers: 'Funkce, role, datový model, integrace, bezpečnostní požadavky a provozní nároky.',
  },
];

export default function Cenik() {
  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Orientační ceny</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Ceník webů a vývoje</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">U zakázkového vývoje dává smysl nejdřív znát cíl a rozsah. Proto uvádím realistické startovní ceny, ne falešně přesnou částku z automatické kalkulačky.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((item) => (
            <article key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-3"><h2 className="text-2xl font-bold">{item.name}</h2><strong className="text-xl text-primary">{item.price}</strong></div>
              <p className="mt-4 leading-7 text-white/75">{item.audience}</p>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/60">Typicky obsahuje</h3>
              <ul className="mt-3 space-y-2">
                {item.includes.map((feature) => <li key={feature} className="flex gap-2 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><span>{feature}</span></li>)}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-sm text-white/65"><strong className="text-white/85">Cenu ovlivňuje:</strong> {item.drivers}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2" aria-labelledby="dalsi-naceneni">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 id="dalsi-naceneni" className="text-2xl font-bold">Hodinová práce</h2>
            <p className="mt-3 text-3xl font-extrabold text-primary">{BASE_HOURLY_RATE} Kč / hod</p>
            <p className="mt-3 text-white/70">Používám ji tam, kde je hodinové účtování vhodnější než pevná projektová cena — například u menších zásahů nebo navazujícího vývoje.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-bold">Komplexnější projekt</h2>
            <p className="mt-3 text-xl font-bold text-primary">Cena individuálně podle rozsahu.</p>
            <p className="mt-3 text-white/70">Před zahájením si odsouhlasíme rozsah, způsob nacenění a co přesně bude součástí předání.</p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-primary/25 bg-primary/5 p-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Nejste si jistí rozsahem?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">Stačí stručně popsat, co má web nebo aplikace vyřešit. Navrhnu další postup a řeknu, jak projekt dává smysl nacenit.</p>
          <Link href="/kontakt" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90">Probrat projekt <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </section>
      </div>
    </section>
  );
}
