import Image from 'next/image';
import Link from 'next/link';

const services = [
  ['Webové stránky', 'Firemní weby, landing pages a menší prezentace na míru.'],
  ['Webové aplikace', 'Aplikace s databází, přihlášením, administrací nebo API.'],
  ['Software na míru', 'Vyvíjím také interní nástroje a menší aplikace podle konkrétního zadání.'],
  ['Integrace a automatizace', 'Propojuji aplikace přes API a automatizuji opakované úlohy.'],
  ['Správa a další vývoj', 'Mohu převzít údržbu existujícího projektu nebo pokračovat na webu po spuštění.'],
] as const;

const featuredProjects = [
  {
    href: '/projekty/faketube',
    image: '/images/projekty/faketube.jpg',
    title: 'FakeTube',
    text: 'Vlastní video platforma s uživatelskými účty, nahráváním a přehráváním videí.',
  },
  {
    href: '/projekty/bresskamp',
    image: '/images/projekty/bresskamp.jpg',
    title: 'BressKamp',
    text: 'One-page firemní web pro německou společnost, upravený podle dodaného obsahu a požadavků.',
  },
] as const;

export default function Home() {
  return (
    <div className="py-10 md:py-14">
      <section className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Petr Vurm</h1>
        <p className="mt-4 text-xl font-medium text-white/90 md:text-2xl">Webový vývojář a software developer.</p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
          Tvořím webové stránky, webové aplikace a software na míru. Pracuji s firmami, živnostníky i na vlastních projektech.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projekty" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Projekty
          </Link>
          <Link href="/kontakt" className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Kontakt
          </Link>
        </div>
      </section>

      <section id="sluzby" className="container mx-auto max-w-6xl border-t border-white/10 px-4 py-12 md:px-6" aria-labelledby="sluzby-title">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="sluzby-title" className="text-3xl font-bold tracking-tight">Co dělám</h2>
          <Link href="/cenik" className="text-sm text-primary hover:underline">Ceník</Link>
        </div>
        <div className="mt-7 grid gap-x-10 md:grid-cols-2">
          {services.map(([title, text]) => (
            <div key={title} className="border-t border-white/10 py-5">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl border-t border-white/10 px-4 py-12 md:px-6" aria-labelledby="projekty-title">
        <div className="flex items-end justify-between gap-4">
          <h2 id="projekty-title" className="text-3xl font-bold tracking-tight">Vybrané projekty</h2>
          <Link href="/projekty" className="hidden text-sm text-primary hover:underline sm:inline">Všechny projekty</Link>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article key={project.title}>
              <Link href={project.href} className="block">
                <Image
                  src={project.image}
                  alt={`Náhled projektu ${project.title}`}
                  width={900}
                  height={560}
                  className="aspect-video w-full rounded-lg border border-white/10 object-cover"
                  priority={index === 0}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </Link>
              <h3 className="mt-4 text-xl font-bold">{project.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{project.text}</p>
              <Link href={project.href} className="mt-3 inline-block text-sm text-primary hover:underline">Detail projektu</Link>
            </article>
          ))}
        </div>
        <Link href="/projekty" className="mt-7 inline-block text-sm text-primary hover:underline sm:hidden">Všechny projekty</Link>
      </section>

      <section className="container mx-auto max-w-6xl border-t border-white/10 px-4 py-12 md:px-6" aria-labelledby="o-mne-title">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <h2 id="o-mne-title" className="text-3xl font-bold tracking-tight">Krátce o mně</h2>
            <p className="mt-4 leading-7 text-white/70">
              Webům a programování se věnuji od roku 2017. Začínal jsem jednoduchými stránkami a vlastními projekty, postupně jsem přešel k backendu, databázím a celým webovým aplikacím.
            </p>
            <p className="mt-3 leading-7 text-white/70">
              Zakázku mohu řešit od návrhu přes vývoj až po nasazení a předání zdrojového kódu.
            </p>
            <Link href="/o-mne" className="mt-4 inline-block text-sm text-primary hover:underline">Více o mně</Link>
          </div>
          <Image src="/images/me/cro_interview.webp" alt="Petr Vurm" width={180} height={240} className="hidden aspect-[3/4] w-36 rounded-lg border border-white/10 object-cover md:block" sizes="144px" />
        </div>
      </section>

      <section className="container mx-auto max-w-6xl border-t border-white/10 px-4 py-12 md:px-6">
        <h2 className="text-2xl font-bold">Máte projekt?</h2>
        <p className="mt-2 max-w-xl text-white/60">Napište mi pár vět o tom, co potřebujete vytvořit nebo upravit.</p>
        <Link href="/kontakt" className="mt-5 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">Kontakt</Link>
      </section>
    </div>
  );
}
