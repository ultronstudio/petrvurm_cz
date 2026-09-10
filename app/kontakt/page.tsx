import Link from 'next/link';

export default function Kontakt() {
  return (
    <section className="py-14 md:py-18">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Kontakt</h1>
          <p className="mt-4 leading-7 text-white/70">Stačí pár vět o tom, co potřebujete. Pokud už existuje web, aplikace nebo zadání, přidejte odkaz.</p>
        </header>

        <div className="mt-10 border-b border-white/10">
          <section className="grid gap-3 border-t border-white/10 py-6 sm:grid-cols-[9rem_1fr]">
            <h2 className="font-semibold">E-mail</h2>
            <div>
              <a href="mailto:kontakt@petrvurm.cz?subject=Poptávka%20projektu" className="text-lg text-primary hover:underline">kontakt@petrvurm.cz</a>
              <p className="mt-2 text-sm leading-6 text-white/60">Nejlepší pro první zprávu, odkazy a podklady.</p>
            </div>
          </section>
          <section className="grid gap-3 border-t border-white/10 py-6 sm:grid-cols-[9rem_1fr]">
            <h2 className="font-semibold">Telefon</h2>
            <div>
              <a href="tel:+420777416611" className="text-lg text-white hover:text-primary">+420 777 416 611</a>
              <p className="mt-2 text-sm leading-6 text-white/60">Pro krátkou domluvu nebo navazující hovor.</p>
            </div>
          </section>
        </div>

        <section className="mt-9 max-w-2xl">
          <h2 className="text-2xl font-bold">Co se hodí napsat</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/70">
            <li>co má web nebo aplikace dělat,</li>
            <li>pro koho je určená,</li>
            <li>co je pro první verzi nejdůležitější,</li>
            <li>případný termín nebo rozpočet, pokud ho už znáte.</li>
          </ul>
        </section>

        <div className="mt-10 border-t border-white/10 pt-7 text-sm text-white/60">
          <p><strong className="text-white/80">Petr Vurm</strong> · IČ: 21180164 · neplátce DPH</p>
          <Link href="/jak-pracuji" className="mt-3 inline-block text-primary hover:underline">Jak pracuji</Link>
        </div>
      </div>
    </section>
  );
}
