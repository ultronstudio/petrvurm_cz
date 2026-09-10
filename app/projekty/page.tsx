import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'FakeTube',
    slug: 'faketube',
    image: '/images/projekty/faketube.jpg',
    description: 'Vlastní video platforma s uživatelskými účty, nahráváním a přehráváním videí.',
    technologies: 'Laravel · Livewire · MariaDB · JavaScript',
  },
  {
    title: 'BressKamp',
    slug: 'bresskamp',
    image: '/images/projekty/bresskamp.jpg',
    description: 'One-page firemní web pro německou společnost.',
    technologies: 'HTML · CSS · JavaScript · PHP',
  },
  {
    title: 'Ivan',
    slug: 'sspt-ivan',
    image: '/images/projekty/sspt-ivan.jpg',
    description: 'Nástroj pro přípravu zasedacího pořádku celostátní matematické soutěže.',
    technologies: 'C# · .NET · MariaDB',
  },
  {
    title: 'MeGen',
    slug: 'megen',
    image: '/images/projekty/megen.jpg',
    description: 'Webová aplikace pro generování memů z textu a obrázků.',
    technologies: 'Webová aplikace · generativní model',
  },
  {
    title: 'HopHub',
    slug: 'hophub',
    image: '/images/projekty/hophub.png',
    description: 'Experimentální rozšíření prohlížeče, které mění vzhled GitHubu.',
    technologies: 'JavaScript · Sass · Browser Extensions',
  },
  {
    title: 'Twitch: Red Light, Green Light',
    slug: 'twitch-chatbot-red-light-green-light',
    image: '/images/projekty/twitch-chatbot-red-light-green-light.png',
    description: 'Chatbot, přes který mohou diváci hrát jednoduchou hru přímo v Twitch chatu.',
    technologies: 'Node.js · JavaScript · Twitch API',
  },
] as const;

export default function Projekty() {
  return (
    <section className="py-14 md:py-18">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projekty</h1>
          <p className="mt-4 leading-7 text-white/70">Výběr webů, aplikací a dalších projektů, na kterých jsem pracoval.</p>
        </header>

        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.slug}>
              <Link href={`/projekty/${project.slug}`} className="block">
                <Image
                  src={project.image}
                  alt={`Náhled projektu ${project.title}`}
                  width={900}
                  height={560}
                  className="aspect-video w-full rounded-lg border border-white/10 object-cover"
                  priority={index < 2}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </Link>
              <h2 className="mt-4 text-xl font-bold">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">{project.description}</p>
              <p className="mt-3 text-sm text-white/45"><span className="text-white/65">Technologie:</span> {project.technologies}</p>
              <Link href={`/projekty/${project.slug}`} className="mt-3 inline-block text-sm text-primary hover:underline">Detail projektu</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
