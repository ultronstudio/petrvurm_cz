import Link from 'next/link';
import { BASE_HOURLY_RATE } from '@/lib/pricing';

export default function TrainingPricing() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Výuka a konzultace IT</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/70">
        Nabízím individuální výuku programování a IT konzultace. Základní sazba je {BASE_HOURLY_RATE} Kč / hod. U skupin nebo delšího školení se cena domlouvá podle rozsahu.
      </p>
      <Link href="/kontakt" className="mt-6 inline-block text-primary hover:underline">Kontakt</Link>
    </section>
  );
}
