import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const steps = [
  ['01', 'Úvodní konzultace', 'Probereme cíl projektu, současný stav, priority a omezení. Smyslem není hned prodávat řešení, ale zjistit, co má projekt skutečně vyřešit.'],
  ['02', 'Zadání a rozsah', 'Sepíšu funkce, obsah, hranice dodávky a otevřené otázky. Ujasníme si, co je součástí první verze a co může počkat.'],
  ['03', 'Návrh řešení', 'Navrhnu strukturu, uživatelský tok a technický postup. U složitějších projektů rozdělím práci do smysluplných etap.'],
  ['04', 'Implementace', 'Vyvíjím odsouhlasené řešení v současném stacku projektu nebo v technologii zvolené podle jeho potřeb.'],
  ['05', 'Testování', 'Kontroluji hlavní scénáře, responzivitu, chybové stavy, výkon a relevantní bezpečnostní rizika před nasazením.'],
  ['06', 'Nasazení', 'Připravím produkční prostředí a ověřím, že výsledná verze funguje i mimo vývojové prostředí.'],
  ['07', 'Předání', 'Předám zdrojový kód, přístupy a potřebné instrukce. Rozsah dokumentace odpovídá typu a velikosti projektu.'],
  ['08', 'Podpora a další rozvoj', 'Po spuštění lze pokračovat údržbou, aktualizacemi a novými funkcemi podle skutečných potřeb projektu.'],
] as const;

export default function JakPracuji() {
  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Proces spolupráce</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Jak pracuji</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">Cílem je, abyste před zahájením věděli, co se bude dělat, přibližný rozsah, jak se projekt nacení a co dostanete při předání.</p>
        </header>

        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map(([number, title, description]) => (
            <li key={number} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4"><span className="text-lg font-extrabold text-primary" aria-hidden="true">{number}</span><div><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/72">{description}</p></div></div>
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-7" aria-labelledby="pred-zahajenim">
          <h2 id="pred-zahajenim" className="text-2xl font-bold">Co si potvrdíme před zahájením</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {['Cíl a rozsah první verze', 'Cena nebo způsob nacenění', 'Důležité závislosti a podklady', 'Co bude součástí předání'].map((item) => <div key={item} className="flex items-start gap-2 text-white/80"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Máte konkrétní projekt?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">Pošlete mi stručný popis cíle a současného stavu. Další postup můžeme upřesnit bez zbytečné obchodní omáčky.</p>
          <Link href="/kontakt" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90">Probrat projekt <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
        </section>
      </div>
    </section>
  );
}
