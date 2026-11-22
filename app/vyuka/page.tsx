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

export default function VyukaPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(teachingJsonLd) }} />
      <h1 className="text-4xl font-bold tracking-tight">Výuka programování</h1>

      <section id="kalkulacka" aria-labelledby="temata-vyuky" className="mt-8 scroll-mt-24">
        <h2 id="temata-vyuky" className="text-2xl font-semibold">Individuální doučování</h2>
        <p id="kalkulacka-title" className="mt-2 text-white/70">Školní látka i vlastní projekt. Od {TEACHING_MIN_PRICE} Kč za 60 minut.</p>
        <LearningCalculator />
      </section>

      <section id="workshopy-a-prednasky" aria-labelledby="group-title" className="mt-10 scroll-mt-24 border-t border-white/15 pt-6">
        <h2 id="group-title" className="text-2xl font-semibold">Workshopy a přednášky</h2>
        <p className="mt-2 leading-6 text-white/70">Pro školy, knihovny a firmy. Napište mi téma, počet účastníků a termín. Navrhnu program i cenu.</p>
        <details className="my-4">
          <summary className="cursor-pointer font-medium">Témata pro skupiny</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/70">
            {GROUP_TOPICS.map((topic) => <li key={topic.id}>{topic.name}</li>)}
          </ul>
        </details>
        <a href="mailto:kontakt@petrvurm.cz?subject=Poptávka%20workshopu%20nebo%20přednášky" className="font-medium text-primary hover:underline">Poptat skupinovou výuku</a>
      </section>
    </div>
  );
}
