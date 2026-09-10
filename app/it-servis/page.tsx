import Link from 'next/link';
import { Check } from 'lucide-react';
import { getAllCities } from '@/site.config';

export default function ItServis() {
  const cities = getAllCities();

  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <header className="py-12 text-center md:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Sekundární služba</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Lokální IT servis</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Vedle vývoje webů a softwaru nabízím v okolí Nechanic také praktickou pomoc s domácí sítí a zařízeními.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-7 md:p-9" aria-labelledby="it-servis-sluzby">
          <h2 id="it-servis-sluzby" className="text-2xl font-bold">Typické požadavky</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              'Nastavení a optimalizace domácí Wi-Fi',
              'Zprovoznění Mesh Wi-Fi',
              'Připojení tiskáren a chytrých TV',
              'Základní technologická konzultace',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/80">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-12" aria-labelledby="obsluhovane-lokality">
          <h2 id="obsluhovane-lokality" className="text-2xl font-bold">Obsluhované lokality</h2>
          <p className="mt-3 max-w-3xl text-white/70">
            Samostatné stránky uvádím jen pro oblasti, které mám výslovně nastavené jako obsluhované. U jiné obce se lze domluvit individuálně.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link key={city.slug} href={`/it-servis/${city.slug}`} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-primary/60 hover:text-primary">
                {city.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center">
          <h2 className="text-2xl font-bold">Jiná lokalita nebo jiný problém?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">Napište mi, co potřebujete vyřešit. Potvrdím, zda je výjezd reálný a jaká bude orientační cena.</p>
          <Link href="/kontakt" className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-black transition hover:bg-primary/90">Probrat požadavek</Link>
        </div>
      </div>
    </section>
  );
}
