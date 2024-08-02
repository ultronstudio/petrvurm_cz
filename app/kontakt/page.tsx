import { Section, Container, Card } from "@radix-ui/themes";

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
              <a href="mailto:kontakt@petrvurm.cz" className="text-blue-500">
                kontakt@petrvurm.cz
              </a>
            </p>
            <p className="mt-2">
              Odpovím vám co nejdříve, obvykle do 24 hodin.
            </p>
          </div>
        </div>
        {/* Ceník */}
        <div className="mt-6">
          <div className="w-full pr-0 md:pr-4 lg:pr-4 xl:pr-4 text-justify">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ceník
            </h3>
            <p className="mt-2">
              Stanovení konkrétní ceny za služby a za další činnosti, kterými se
              zabývám, je různorodá. Každý projekt si žádá jiné množství času a
              v řadě případů není možné projekt účtovat po hodinové sazbě.
            </p>
            <p className="mt-2">
              Cena za konkrétní projekty se liší podle zadání. Pro základní
              cenovou představu mých služeb vám nabízím alespoň základní
              orientační ceník:
            </p>
          </div>
          <div className="w-full mt-4">
            <div className="flex flex-row gap-3 justify-center">
              <Card className="p-6 xl:p-10 lg:p-8 shadow-md rounded-lg text-center flex flex-col justify-between">
                <h4 className="text-xl font-bold text-primary">Jednostránkový web</h4>
                <p className="mt-4">
                  Vhodný pro prezentaci vaší
                  <br />
                  firmy nebo produktu.
                </p>
                <ul className="mt-4 text-left">
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    SEO optimalizace
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Responsivní design
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Na nejlevnějším hostingu
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Doména na rok v ceně (platí pro .cz, .sk, .eu)
                  </li>
                </ul>
                <div className="mt-6 font-bold text-xl">
                  <p>Cena: 5 000 Kč</p>
                </div>
              </Card>
              <Card className="p-6 xl:p-10 lg:p-8 shadow-md rounded-lg text-center flex flex-col justify-between">
                <h4 className="text-xl font-bold text-primary">Webová aplikace</h4>
                <p className="mt-4">
                  Vhodná pro větší projekty
                  <br />
                  s vlastním backendem.
                </p>
                <ul className="mt-4 text-left">
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    SEO optimalizace
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Responsivní design
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Vlastní backend
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Na výkonném hostingu
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#70e000] font-bold">&#10003;</span>
                    Doména na rok v ceně (platí pro .cz, .sk, .eu)
                  </li>
                </ul>
                <div className="mt-6 font-bold text-xl">
                  <p>Cena: od 10 000 Kč</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
