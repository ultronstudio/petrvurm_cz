import Link from 'next/link';
import LearningCalculator from '@/components/LearningCalculator/LearningCalculator';
import { GROUP_TOPICS, TEACHING_MIN_PRICE, TEACHING_TOPICS } from '@/lib/teaching';
import { PERSON_ID, WEBSITE_ID, breadcrumbJsonLd, serializeJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/site.config';

const pageId = `${SITE_URL}/vyuka#page`;
const serviceId = `${SITE_URL}/vyuka#service`;
const catalogId = `${SITE_URL}/vyuka#individual-teaching`;
const breadcrumbId = `${SITE_URL}/vyuka#breadcrumb`;

const teachingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: `${SITE_URL}/vyuka`,
      name: 'Výuka, workshopy a přednášky – Petr Vurm',
      description: 'Individuální výuka programování, mentoring a praktické workshopy a přednášky pro jednotlivce, školy, knihovny a firmy.',
      inLanguage: 'cs-CZ',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      mainEntity: { '@id': serviceId },
      breadcrumb: { '@id': breadcrumbId },
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: 'Výuka programování, workshopy a přednášky',
      description: 'Praktická individuální výuka programování a webového vývoje, mentoring a skupinové workshopy nebo přednášky na domluvené téma.',
      provider: { '@id': PERSON_ID },
      hasOfferCatalog: { '@id': catalogId },
    },
    {
      '@type': 'OfferCatalog',
      '@id': catalogId,
      name: 'Individuální výuka programování',
      itemListElement: TEACHING_TOPICS.map((topic) => ({
        '@type': 'Offer',
        seller: { '@id': PERSON_ID },
        itemOffered: {
          '@type': 'Service',
          name: topic.name,
          description: topic.description,
          provider: { '@id': PERSON_ID },
        },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: topic.price,
          priceCurrency: 'CZK',
          unitText: '60 minut',
        },
      })),
    },
    {
      ...breadcrumbJsonLd([
        { name: 'Petr Vurm', path: '/' },
        { name: 'Výuka', path: '/vyuka' },
      ]),
      '@id': breadcrumbId,
    },
  ],
};

const offerTypes = [
  {
    name: 'Individuální výuka a mentoring',
    text: 'Pro školní látku, vlastní projekt i konkrétní problém v kódu. Cílem je pochopit princip a umět pokračovat samostatně, ne jen získat hotové řešení.',
  },
  {
    name: 'Workshopy',
    text: 'Praktická skupinová výuka pro školy, knihovny, kroužky, komunity nebo menší týmy. Účastníci si téma rovnou vyzkouší na konkrétních příkladech.',
  },
  {
    name: 'Přednášky a webináře',
    text: 'Srozumitelné technické téma pro studenty, veřejnost nebo zaměstnance. Obsah, délku a obtížnost lze přizpůsobit cílové skupině.',
  },
];

const formats = [
  ['Přednáška', 'Typicky 45–90 minut, prostor pro dotazy a ukázky.'],
  ['Workshop', 'Přibližně 90 minut až 3 hodiny s praktickou částí.'],
  ['Webinář', 'Online forma pro skupinu, školu nebo organizaci.'],
  ['Vícedílný kurz', 'Po domluvě lze připravit navazující sérii lekcí s konkrétní osnovou.'],
];

export default function VyukaPage() {
  return (
    <section className="py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(teachingJsonLd) }} />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Výuka, workshopy a přednášky</h1>
          <p className="mt-4 leading-7 text-white/70">
            Praktická výuka programování a webového vývoje pro jednotlivce i skupiny. Pro školy, knihovny, firmy a další organizace mohu připravit také workshop, webinář nebo přednášku na domluvené téma.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="#kalkulacka" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">
              Spočítat individuální výuku
            </a>
            <a href="#workshopy-a-prednasky" className="text-sm font-semibold text-white/70 hover:text-white">
              Workshopy a přednášky
            </a>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="co-nabizim">
          <h2 id="co-nabizim" className="text-3xl font-bold">Co nabízím</h2>
          <div className="mt-7 grid gap-x-10 md:grid-cols-3">
            {offerTypes.map((item) => (
              <div key={item.name} className="border-t border-white/10 py-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="temata-vyuky">
          <div className="max-w-3xl">
            <h2 id="temata-vyuky" className="text-3xl font-bold">Individuální výuka</h2>
            <p className="mt-3 leading-7 text-white/65">
              Lekce jsou určené začátečníkům i lidem, kteří už něco tvoří a potřebují vysvětlit konkrétní problém. Cena začíná na {TEACHING_MIN_PRICE} Kč za 60 minut podle tématu.
            </p>
          </div>

          <div className="mt-7 grid gap-x-10 md:grid-cols-2">
            {TEACHING_TOPICS.map((topic) => (
              <div key={topic.id} className="border-t border-white/10 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-white">{topic.name}</h3>
                  <span className="shrink-0 text-sm font-semibold text-primary">{topic.price} Kč / 60 min</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/60">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="kalkulacka" className="mt-16 scroll-mt-24" aria-labelledby="kalkulacka-title">
          <div className="max-w-3xl">
            <h2 id="kalkulacka-title" className="text-3xl font-bold">Kalkulátor individuální výuky</h2>
            <p className="mt-3 leading-7 text-white/65">
              Vyberte téma, formu a počet lekcí. Výsledek je orientační a poptávka se předvyplní do e-mailu.
            </p>
          </div>
          <LearningCalculator />
        </section>

        <section id="workshopy-a-prednasky" className="mt-20 scroll-mt-24" aria-labelledby="group-title">
          <div className="max-w-3xl">
            <h2 id="group-title" className="text-3xl font-bold">Workshopy a přednášky</h2>
            <p className="mt-3 leading-7 text-white/65">
              Skupinové akce připravuji podle cílové skupiny, délky a požadované hloubky. Proto u nich nedávám falešnou univerzální cenu – po krátkém zadání navrhnu konkrétní formát a nabídku.
            </p>
          </div>

          <div className="mt-8 border-b border-white/10">
            {GROUP_TOPICS.map((topic) => (
              <article key={topic.id} className="grid gap-2 border-t border-white/10 py-5 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white">{topic.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{topic.description}</p>
                </div>
                <p className="text-sm leading-6 text-white/45 md:text-right">{topic.audiences.join(' · ')}</p>
              </article>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
            Témata digitální bezpečnosti jsou zaměřená na praktickou osvětu a bezpečné návyky. Nejde o certifikované compliance školení, penetrační test nebo odborný bezpečnostní audit organizace.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="format-title">
          <h2 id="format-title" className="text-3xl font-bold">Možné formáty</h2>
          <div className="mt-7 grid gap-x-10 md:grid-cols-2">
            {formats.map(([name, text]) => (
              <div key={name} className="border-t border-white/10 py-5">
                <h3 className="font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-8" aria-labelledby="poptavka-title">
          <div className="max-w-3xl">
            <h2 id="poptavka-title" className="text-3xl font-bold">Chcete výuku nebo akci pro skupinu?</h2>
            <p className="mt-3 leading-7 text-white/65">
              Napište, pro koho je výuka nebo akce určená, jaké téma vás zajímá, přibližný počet účastníků a preferovaný termín. Podle toho navrhnu vhodný formát.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="mailto:kontakt@petrvurm.cz?subject=Popt%C3%A1vka%20workshopu%20nebo%20p%C5%99edn%C3%A1%C5%A1ky" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">
                Poptat workshop nebo přednášku
              </a>
              <Link href="/kontakt" className="text-sm font-semibold text-white/70 hover:text-white">Kontaktní údaje</Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
