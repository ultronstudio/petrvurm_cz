import { Section, Container, Card } from "@radix-ui/themes";
import Link from "next/link";

interface CenikItemProps {
  title: string;
  description: string;
  features: string[];
  from?: boolean;
  featured?: boolean;
  price: number;
}

function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("cs-CZ", {
    ...options,
    maximumFractionDigits: 0,
  }).format(number);
}

const CenikItem = ({
  title,
  description,
  features,
  from,
  featured,
  price,
}: CenikItemProps) => {
  return (
    <Card
      className={`p-6 xl:p-10 lg:p-8 shadow-md rounded-lg text-center flex flex-col justify-between`}
    >
      <h4 className="text-xl font-bold text-primary">{title}</h4>
      <p className="mt-4">{description}</p>
      <ul className="mt-4 text-left">
        {features.map((feature) => (
          <li className="flex gap-3" key={feature}>
            <span className="text-[#70e000] font-bold">&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 font-bold text-xl">
        <p>
          Cena:{" "}
          {from
            ? `od ${formatNumber(price, {
                style: "currency",
                currency: "CZK",
              })}`
            : `${formatNumber(price, { style: "currency", currency: "CZK" })}`}
        </p>
      </div>
    </Card>
  );
};

const cenikItems = [
  {
    title: "One page web",
    description: "Vhodný pro prezentaci vaší firmy nebo produktu.",
    features: [
      "SEO optimalizace",
      "Responsivní design",
      "Na nejlevnějším hostingu",
      "Doména na rok v ceně (platí pro .cz, .sk, .eu)",
    ],
    from: true,
    price: 1000,
  },
  {
    title: "Webová aplikace",
    description: "Vhodné pro větší a komplexnější projekty.",
    features: [
      "SEO optimalizace",
      "Responsivní design",
      "Vlastní backend",
      "Na výkonném hostingu",
      "Doména na rok v ceně (platí pro .cz, .sk, .eu)",
    ],
    from: true,
    price: 5000,
  },
  {
    title: "Základní e-shop",
    description: "Pro začátek prodávání vašich produktů online.",
    features: [
      "SEO optimalizace",
      "Responsivní design",
      "Jednoduchá administrace",
      "Platební brána GoPay na rok v ceně",
      "Doména na rok v ceně (platí pro .cz, .sk, .eu)",
    ],
    from: true,
    price: 10000,
  },
  {
    title: "Komplexní e-shop",
    description: "Řešení s nekonečnou možností úprav.",
    features: [
      "SEO optimalizace",
      "Responsivní design",
      "Jednoduchá administrace",
      "Úpravy vzhledu a funkcí na míru",
      "Platební brána GoPay na rok v ceně",
      "Doména na rok v ceně (platí pro .cz, .sk, .eu)",
    ],
    from: true,
    price: 20000,
  },
];

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
            <div className="flex md:inline-grid flex-col md:grid-cols-3 gap-3 justify-center">
              {cenikItems.map((item, index) => (
                <CenikItem key={index} {...item} />
              ))}
            </div>
          </div>
          <div className="w-full mt-4">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Doplňkové služby
            </h3>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <Card className="p-6 xl:p-10 lg:p-8 shadow-md rounded-lg text-center flex flex-col justify-between">
                <h3 className="text-2xl font-bold">Prodloužení domény</h3>
                <p className="mt-4">
                  Prodloužení domény na další rok (platí pro .cz, .sk, .eu) podle aktuálních cen registrátora (<Link href="https://www.wedos.com/cs/" target="_blank" className="link">Wedos</Link>).
                </p>
              </Card>
              <Card className="p-6 xl:p-10 lg:p-8 shadow-md rounded-lg text-center flex flex-col justify-between">
                <h3 className="text-2xl font-bold">Návrh webu</h3>
                <p className="mt-4">
                  Podle vašeho zadání vytvořím návrh webu v grafickém programu, který vám pomůže představit si výsledný vzhled. Pokud s návrhem budete spokojeni, vypracuji vám web podle něj.
                </p>
                <p className="mt-4">
                  Cena za návrh webu je 500 Kč. Platí se pouze v případě, že se rozhodnete pro realizaci webu.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
