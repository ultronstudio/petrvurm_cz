import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'FakeTube',
    slug: 'faketube',
    goal: 'Vlastní video platforma, na které uživatelé mohli nahrávat, sledovat a sdílet obsah.',
    solution: 'Dlouhodobě rozvíjená webová aplikace s uživateli, obsahem a backendovou logikou kolem videí.',
    shows: ['webová aplikace', 'backend a databáze', 'uživatelský obsah'],
  },
  {
    title: 'BressKamp',
    slug: 'bresskamp',
    goal: 'Jednoduchá prezentační stránka pro německou společnost BressKamp.',
    solution: 'One-page web postavený na upravené šabloně s důrazem na responzivitu, rychlost a základní SEO.',
    shows: ['firemní prezentace', 'responzivní web', 'optimalizace'],
  },
  {
    title: 'Ivan',
    slug: 'sspt-ivan',
    goal: 'Zjednodušit organizátorům celostátní matematické soutěže tvorbu zasedacího pořádku.',
    solution: 'Týmový školní projekt, který převádí ruční organizační úlohu do specializovaného nástroje.',
    shows: ['zakázková logika', 'C#', 'databázová práce'],
  },
  {
    title: 'MeGen',
    slug: 'megen',
    goal: 'Umožnit uživatelům vytvářet memy ze zadaných textů a obrázků bez složité grafické úpravy.',
    solution: 'Webová aplikace propojující jednoduché uživatelské rozhraní s generováním obsahu a možností sdílení.',
    shows: ['webová aplikace', 'integrace AI modelu', 'práce s uživatelským vstupem'],
  },
  {
    title: 'HopHub',
    slug: 'hophub',
    goal: 'Experimentovat s úpravou rozhraní existující webové aplikace přímo v prohlížeči.',
    solution: 'Browser extension publikované pro Firefox, Microsoft Edge a Chrome, které mění vizuální podobu GitHubu.',
    shows: ['browser extensions', 'DOM a styly', 'multi-browser distribuce'],
  },
  {
    title: 'Twitch: Red Light, Green Light',
    slug: 'twitch-chatbot-red-light-green-light',
    goal: 'Přenést jednoduchou interaktivní hru přímo do Twitch chatu.',
    solution: 'Chatbot, přes který mohou diváci ovládat hru pomocí zpráv v chatu.',
    shows: ['API integrace', 'Node.js', 'událostní logika'],
  },
];

export default function Projekty() {
  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Projekty a případové ukázky</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">Nejde jen o seznam frameworků. U každého projektu ukazuji, co měl řešit, jaký typ řešení vznikl a jaké schopnosti na něm lze reálně doložit.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <div className="mt-5 space-y-4 text-sm leading-6">
                <div><h3 className="font-semibold text-primary">Cíl / problém</h3><p className="mt-1 text-white/75">{project.goal}</p></div>
                <div><h3 className="font-semibold text-primary">Řešení</h3><p className="mt-1 text-white/75">{project.solution}</p></div>
                <div><h3 className="font-semibold text-primary">Co projekt ukazuje</h3><div className="mt-2 flex flex-wrap gap-2">{project.shows.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75">{item}</span>)}</div></div>
              </div>
              <Link href={`/projekty/${project.slug}`} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline">Detail projektu <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
