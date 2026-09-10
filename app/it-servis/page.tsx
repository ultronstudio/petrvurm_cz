import Link from 'next/link';
import { getAllCities } from '@/site.config';

const services = [
  'Nastavení a optimalizace domácí Wi-Fi',
  'Zprovoznění Mesh Wi-Fi',
  'Připojení tiskáren a chytrých TV',
  'Základní technologická konzultace',
] as const;

export default function ItServis() {
  const cities = getAllCities();

  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Lokální IT servis</h1>
          <p className="mt-4 leading-7 text-white/70">V okolí Nechanic pomáhám také s domácí sítí a běžným nastavením zařízení.</p>
        </header>

        <section className="mt-10 border-t border-white/10 pt-7" aria-labelledby="it-servis-sluzby">
          <h2 id="it-servis-sluzby" className="text-2xl font-bold">S čím pomohu</h2>
          <ul className="mt-5 divide-y divide-white/10 border-b border-white/10">
            {services.map((item) => <li key={item} className="py-3 text-white/75">{item}</li>)}
          </ul>
        </section>

        <section className="mt-10 border-t border-white/10 pt-7" aria-labelledby="obsluhovane-lokality">
          <h2 id="obsluhovane-lokality" className="text-2xl font-bold">Lokality</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Samostatné stránky mám jen pro oblasti, které běžně obsluhuji. U jiné obce se můžeme domluvit individuálně.</p>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {cities.map((city) => <Link key={city.slug} href={`/it-servis/${city.slug}`} className="text-sm text-primary hover:underline">{city.name}</Link>)}
          </div>
        </section>

        <section className="mt-10 border-t border-white/10 pt-7">
          <h2 className="text-2xl font-bold">Jiná obec nebo jiný problém?</h2>
          <p className="mt-3 max-w-xl text-white/60">Napište mi, co potřebujete vyřešit a kde.</p>
          <Link href="/kontakt" className="mt-4 inline-block text-primary hover:underline">Kontakt</Link>
        </section>
      </div>
    </section>
  );
}
