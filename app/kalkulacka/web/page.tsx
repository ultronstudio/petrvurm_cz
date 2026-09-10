import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WebCalculator() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-20 md:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nacenění webu</p>
      <h1 className="mt-3 text-4xl font-bold">Orientační kalkulačku jsem zjednodušil</h1>
      <p className="mt-5 text-lg leading-8 text-white/75">Zakázkový web nejde poctivě nacenit výběrem několika checkboxů na korunu přesně. Na ceníku proto najdete startovní ceny podle typu projektu a faktory, které výslednou cenu nejvíc ovlivňují.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/cenik" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-black hover:bg-primary/90">Zobrazit orientační ceny <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/kontakt" className="inline-flex rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:border-primary/60">Probrat projekt</Link></div>
    </section>
  );
}
