import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/site.config';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/o-mne#profile`,
      url: `${SITE_URL}/o-mne`,
      name: 'O mně – Petr Vurm',
      description: 'Profil Petra Vurma, webového vývojáře a software developera.',
      inLanguage: 'cs-CZ',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
      breadcrumb: { '@id': `${SITE_URL}/o-mne#breadcrumb` },
    },
    {
      ...breadcrumbJsonLd([
        { name: 'Petr Vurm', path: '/' },
        { name: 'O mně', path: '/o-mne' },
      ]),
      '@id': `${SITE_URL}/o-mne#breadcrumb`,
    },
  ],
};

export default function OMne() {
  return (
    <section className="py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileJsonLd) }} />
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">O mně</h1>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Jmenuji se Petr Vurm. Webům se věnuji od roku 2017. Začínal jsem v kroužku tvorby webových stránek a potom jsem pokračoval vlastními projekty.
            </p>
            <p className="mt-4 leading-7 text-white/70">
              Postupně jsem se od HTML a CSS dostal k JavaScriptu, backendu, databázím a vývoji celých aplikací. Dnes dělám webové stránky a software pro vlastní projekty i pro další lidi a firmy.
            </p>
          </div>
          <Image src="/images/me/cro_interview.webp" alt="Petr Vurm" width={320} height={427} className="aspect-[3/4] w-full max-w-[260px] rounded-lg border border-white/10 object-cover" priority sizes="260px" />
        </header>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold">Čemu se věnuji</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/70">
            Nejčastěji pracuji s webovými aplikacemi, backendem, databázemi a API. Baví mě projekty, kde je potřeba něco skutečně naprogramovat a promyslet, ne jen poskládat obsah stránky.
          </p>
          <p className="mt-3 max-w-3xl leading-7 text-white/70">
            Vedle zakázek dělám vlastní projekty, na kterých zkouším nové technologie a postupy.
          </p>
        </section>

        <section className="mt-10 border-t border-white/10 pt-8" aria-labelledby="vzdelani-certifikaty">
          <h2 id="vzdelani-certifikaty" className="text-2xl font-bold">Studium a certifikáty</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Studium</h3>
              <ul className="mt-4 space-y-4 text-sm leading-6 text-white/70">
                <li><strong className="text-white">SPŠE a VOŠ Pardubice</strong><br />2026–2027 · Informační technologie – vývoj aplikací</li>
                <li><strong className="text-white">SPŠ, SOŠ a SOU Hradec Králové</strong><br />2021–2026 · Informační technologie</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Certifikáty</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                <li><Link href="/docs/certificates/cisco/network-technician-career-path.pdf" target="_blank" className="text-primary hover:underline">Cisco Networking Academy – Network Technician Career Path</Link></li>
                <li><Link href="/docs/certificates/cisco/javascript-essentials-1.pdf" target="_blank" className="text-primary hover:underline">Cisco Networking Academy – JavaScript Essentials 1</Link></li>
                <li><Link href="/docs/certificates/dofe/bronze.pdf" target="_blank" className="text-primary hover:underline">DofE – bronzová úroveň</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold">Kontakt</h2>
          <p className="mt-3 text-white/70">Pokud řešíte web nebo aplikaci, napište mi.</p>
          <Link href="/kontakt" className="mt-4 inline-block text-primary hover:underline">kontakt@petrvurm.cz</Link>
        </section>
      </div>
    </section>
  );
}
