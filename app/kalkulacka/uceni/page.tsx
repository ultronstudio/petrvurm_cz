import Link from 'next/link';
import { BASE_HOURLY_RATE } from '@/lib/pricing';

export default function TrainingPricing() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-20 md:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Školení a konzultace</p>
      <h1 className="mt-3 text-4xl font-bold">Individuální výuka IT</h1>
      <p className="mt-5 text-lg leading-8 text-white/75">Individuální konzultace a výuka programování jsou vedlejší službou. Základní hodinová sazba je {BASE_HOURLY_RATE} Kč / hod; u skupin nebo uceleného školení připravím cenu podle rozsahu.</p>
      <Link href="/kontakt" className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-black hover:bg-primary/90">Probrat požadavek</Link>
    </section>
  );
}
