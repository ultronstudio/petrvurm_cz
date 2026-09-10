import Link from 'next/link';

const steps = [
  ['1', 'Úvodní konzultace', 'Krátce probereme, co potřebujete vytvořit, co už máte a co je pro projekt důležité.'],
  ['2', 'Zadání a rozsah', 'Sepíšeme hlavní funkce, obsah a hranice první verze. Součástí je i cena nebo způsob nacenění.'],
  ['3', 'Návrh', 'Upřesním strukturu webu nebo aplikace a zvolím technický postup.'],
  ['4', 'Vývoj', 'Projekt programuji po jednotlivých částech. U delší práce průběžně ukazuji aktuální stav.'],
  ['5', 'Testování', 'Před nasazením projdu hlavní funkce, mobilní zobrazení a chybové stavy.'],
  ['6', 'Nasazení', 'Web nebo aplikaci nasadím do produkčního prostředí a ověřím její běh.'],
  ['7', 'Předání', 'Předám zdrojový kód, potřebné přístupy a domluvenou dokumentaci.'],
  ['8', 'Další úpravy', 'Pokud je potřeba, můžeme pokračovat údržbou nebo vývojem dalších funkcí.'],
] as const;

export default function JakPracuji() {
  return (
    <section className="py-14 md:py-18">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Jak pracuji</h1>
          <p className="mt-4 leading-7 text-white/70">Průběh se liší podle velikosti projektu, základ je ale podobný.</p>
        </header>

        <ol className="mt-10 border-b border-white/10">
          {steps.map(([number, title, description]) => (
            <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-white/10 py-5 sm:grid-cols-[2.5rem_12rem_1fr] sm:gap-5">
              <span className="font-mono text-sm text-primary" aria-hidden="true">{number}.</span>
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="col-start-2 text-sm leading-6 text-white/65 sm:col-start-3">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 max-w-2xl">
          <p className="leading-7 text-white/70">Než začnu programovat, potvrdíme si rozsah, cenu a to, co bude při dokončení předáno.</p>
          <Link href="/kontakt" className="mt-5 inline-block text-primary hover:underline">Kontakt</Link>
        </div>
      </div>
    </section>
  );
}
