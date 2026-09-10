import Link from 'next/link';

export default function WebCalculator() {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Cena webu</h1>
      <p className="mt-4 max-w-2xl leading-7 text-white/70">
        Orientační ceny webových stránek a aplikací najdete v ceníku. Přesnou cenu určím podle rozsahu a požadovaných funkcí.
      </p>
      <Link href="/cenik" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90">
        Ceník
      </Link>
    </section>
  );
}
