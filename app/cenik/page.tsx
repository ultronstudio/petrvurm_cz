import Link from 'next/link';
import { BASE_HOURLY_RATE, BASE_PROJECT_RATES, formatFromPrice } from '@/lib/pricing';

const prices = [
  ['Web Start', formatFromPrice(BASE_PROJECT_RATES.webStart), 'Jednoduchý one-page web nebo menší prezentace služby.'],
  ['Firemní web', formatFromPrice(BASE_PROJECT_RATES.businessWeb), 'Více podstránek, vlastní struktura, formuláře a základní SEO.'],
  ['Web s CMS', formatFromPrice(BASE_PROJECT_RATES.cmsWeb), 'Firemní web s editovatelným obsahem a dalšími funkcemi.'],
  ['E-shop', formatFromPrice(BASE_PROJECT_RATES.shop), 'Menší e-shop. Cenu ovlivňuje katalog, platby, doprava a případná napojení.'],
  ['Webová aplikace', formatFromPrice(BASE_PROJECT_RATES.webApp), 'Aplikace s vlastní logikou, databází, uživatelskými účty nebo API.'],
] as const;

export default function Cenik() {
  return (
    <section className="py-14 md:py-18">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Ceník</h1>
          <p className="mt-4 leading-7 text-white/70">Orientační ceny nejčastějších typů webů a aplikací.</p>
        </header>

        <div className="mt-10 border-b border-white/10">
          {prices.map(([name, price, description]) => (
            <div key={name} className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[1fr_auto] md:gap-10">
              <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{description}</p>
              </div>
              <p className="text-lg font-semibold text-primary md:text-right">{price}</p>
            </div>
          ))}
          <div className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <h2 className="text-xl font-semibold">Hodinová práce</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Menší úpravy, servis a navazující vývoj.</p>
            </div>
            <p className="text-lg font-semibold text-primary md:text-right">{BASE_HOURLY_RATE} Kč / hod</p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl">
          <p className="leading-7 text-white/70">Přesná cena závisí na rozsahu, obsahu a požadovaných funkcích. U větších nebo neobvyklých projektů připravím individuální nabídku.</p>
          <p className="mt-3 text-sm text-white/55">Jsem neplátce DPH.</p>
          <Link href="/kontakt" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">Kontakt</Link>
        </div>
      </div>
    </section>
  );
}
