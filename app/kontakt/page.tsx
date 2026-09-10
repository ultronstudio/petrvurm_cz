import Link from 'next/link';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export default function Kontakt() {
  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Kontakt</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Proberme váš projekt</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">Nejlépe začneme stručným popisem: co má řešení dělat, pro koho je a zda už existuje současný web nebo aplikace. Nemusíte mít hotové technické zadání.</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">E-mail</h2>
            <p className="mt-2 text-white/70">Nejlepší pro prvotní poptávku, odkazy a další podklady.</p>
            <a href="mailto:kontakt@petrvurm.cz?subject=Poptávka%20projektu" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2.5 font-semibold text-black transition hover:bg-primary/90">kontakt@petrvurm.cz</a>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Telefon</h2>
            <p className="mt-2 text-white/70">Pro krátkou domluvu nebo navazující hovor ke konkrétnímu projektu.</p>
            <a href="tel:+420777416611" className="mt-5 inline-flex rounded-lg border border-white/20 px-4 py-2.5 font-semibold text-white transition hover:border-primary/60 hover:text-primary">+420 777 416 611</a>
          </article>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-7" aria-labelledby="co-poslat">
          <h2 id="co-poslat" className="text-2xl font-bold">Co je užitečné poslat rovnou</h2>
          <ul className="mt-4 grid gap-3 text-white/75 md:grid-cols-2">
            <li>• stručný cíl projektu a cílové uživatele</li><li>• odkaz na současné řešení, pokud existuje</li><li>• funkce, které jsou pro první verzi zásadní</li><li>• orientační termín nebo rozpočtové omezení, pokud ho znáte</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-7 sm:flex-row sm:items-center">
          <div><h2 className="text-lg font-bold">Petr Vurm</h2><p className="mt-1 text-sm text-white/65">IČ: 21180164 · neplátce DPH</p></div>
          <Link href="/jak-pracuji" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Jak probíhá spolupráce <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
