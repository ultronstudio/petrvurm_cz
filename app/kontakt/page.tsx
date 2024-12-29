import { Section, Container, Card } from "@radix-ui/themes";
import Link from "next/link";

export default function Kontakt() {
  return (
    <section id="services" className="py-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Kontaktujte mě
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="w-full pr-0 md:pr-4 lg:pr-4 xl:pr-4 text-justify">
            <p>
              Pokud máte nějaký dotaz, nebo se chcete se mnou spojit, můžete mi
              napsat na email{" "}
              <a href="mailto:kontakt@petrvurm.cz" className="link">
                kontakt@petrvurm.cz
              </a>
            </p>
            <p className="mt-2">
              Odpovím vám co nejdříve, obvykle do 24 hodin.
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-6">
          {/* Karta s odkazem a informacemi na kalkulačku */}
          <Card className="w-full p-4 rounded-lg">
            <h3 className="text-xl font-bold">Kalkulačka</h3>
            <p className="mt-2">Kalkulačku můžete využít pro výpočet orientační ceny vašeho projektu. <a href="/kalkulacka" className="link">Přejít na kalkulačku</a></p>
          </Card>
          {/* Karta dalšími informacemi o mojí společnosti (IČ, bankovní spojení, další kontakty) */}
          <Card className="w-full p-4 rounded-lg ml-4">
            <h3 className="text-xl font-bold">Další informace</h3>
            <p className="mt-2">IČ: 21180164</p>
            <p className="mt-2">Číslo účtu: 7030514389/0800</p>
            <p className="mt-2">IBAN: CZ4608000000007030514389</p>
            <p className="mt-2">
              <a href="mailto:kontakt@petrvurm.cz" className="link">kontakt@petrvurm.cz</a>
            </p>
            <p className="mt-2">
              <a href="tel:+420777416611" className="link">+420 777 416 611</a>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}