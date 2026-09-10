import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@radix-ui/themes';
import { ArrowRight, BriefcaseBusiness, Code2, Cog, Link2, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Firemní weby',
    text: 'Prezentační weby a landing pages, které srozumitelně vysvětlují nabídku firmy a mají pevný technický základ pro další rozvoj.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Webové aplikace',
    text: 'Aplikace s databází, přihlášením, administrací nebo napojením na další služby podle konkrétního pracovního procesu.',
    Icon: Code2,
  },
  {
    title: 'Zakázkový software',
    text: 'Interní nástroje a software na míru tam, kde tabulky nebo hotová služba přestávají stačit.',
    Icon: Cog,
  },
  {
    title: 'Integrace a automatizace',
    text: 'Propojení API a systémů tak, aby se rutinní data nemusela zbytečně přepisovat ručně.',
    Icon: Link2,
  },
  {
    title: 'Dlouhodobý rozvoj a správa',
    text: 'Údržba, bezpečnostní aktualizace a postupné doplňování funkcí podle toho, jak se mění potřeby projektu.',
    Icon: ShieldCheck,
  },
];

const principles = [
  ['Od roku 2017', 'Webům a programování se věnuji od roku 2017.'],
  ['Zdrojový kód', 'Projekt předávám tak, aby na něm šlo dál pracovat.'],
  ['Bez zbytečného lock-inu', 'Volím řešení, která nejsou závislá na jednom dodavateli bez důvodu.'],
  ['Odpovědnost za výsledek', 'Nástroje mohou vývoj urychlit. Za architekturu, bezpečnost a výsledný kód ale odpovídám já.'],
];

export default function Home() {
  return (
    <div className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      <section className="container mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Weby &amp; software na míru</p>
        <h1 className="mx-auto mt-4 max-w-5xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Weby a aplikace, které mají fungovat i za několik let.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
          Navrhuji a vyvíjím weby, webové aplikace a software pro firmy, živnostníky a startupy, které nechtějí jednorázovou šablonu, ale řešení připravené na další rozvoj.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/kontakt" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-black transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Probrat projekt <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/projekty" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Prohlédnout projekty
          </Link>
        </div>
      </section>

      <section id="sluzby" className="container mx-auto max-w-6xl px-4 py-14 md:px-6" aria-labelledby="sluzby-title">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">S čím pomohu</p>
            <h2 id="sluzby-title" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Vývoj zaměřený na výsledek, ne na seznam frameworků</h2>
          </div>
          <Link href="/cenik" className="inline-flex items-center gap-2 text-primary hover:underline">Ceny a rozsah <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, text, Icon }) => (
            <Card key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="inline-flex rounded-lg bg-primary/15 p-2 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></div>
              <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-10 md:px-6" aria-labelledby="principy-title">
        <h2 id="principy-title" className="text-3xl font-bold tracking-tight md:text-4xl">Co dostanete kromě hotové obrazovky</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([title, text]) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-14 md:px-6" aria-labelledby="projekty-title">
        <h2 id="projekty-title" className="text-3xl font-bold tracking-tight md:text-4xl">Vybrané projekty</h2>
        <p className="mt-4 max-w-3xl text-white/70">Ukázky řešení, na kterých je vidět práce s aplikační logikou, uživatelským rozhraním a provozem — nejen použitá technologie.</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {[
            { href: '/projekty/faketube', img: '/images/projekty/faketube.jpg', title: 'FakeTube', text: 'Vlastní video platforma řešící správu a přehrávání obsahu včetně aplikační logiky kolem uživatelů a videí.' },
            { href: '/projekty/hophub', img: '/images/projekty/hophub.png', title: 'HopHub', text: 'Rozšíření pro prohlížeč zaměřené na rychlejší přístup k pracovním nástrojům a každodenním akcím.' },
          ].map((project, index) => (
            <article key={project.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image src={project.img} alt={`Náhled projektu ${project.title}`} width={600} height={400} className="aspect-video w-full object-cover" priority={index === 0} sizes="(min-width: 640px) 50vw, 100vw" />
              <div className="p-5">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{project.text}</p>
                <Link href={project.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Zobrazit případovou ukázku <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-7 text-center md:flex-row md:text-left">
          <div><h2 className="text-2xl font-semibold">Máte web nebo aplikaci, která má vzniknout pořádně?</h2><p className="mt-2 text-sm text-white/75">Popište mi cíl projektu. Nejdřív si ujasníme rozsah, rizika a způsob nacenění.</p></div>
          <Link href="/kontakt" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-black transition hover:bg-primary/90">Probrat projekt <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
