import WebPriceCalculator from '@/components/WebPriceCalculator/WebPriceCalculator';

export default function WebCalculator() {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Cena webu</h1>
          <p className="mt-4 leading-7 text-white/70">
            Vyberte základ projektu a služby navíc. Výsledek je orientační a slouží jako podklad pro poptávku.
          </p>
        </header>
        <WebPriceCalculator />
      </div>
    </section>
  );
}
