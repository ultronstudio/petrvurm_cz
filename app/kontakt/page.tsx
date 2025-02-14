import { Section, Container, Card } from "@radix-ui/themes";
import Link from "next/link";

export default function Kontakt() {
  // Reklamy na WEDOS
  const reklamy = [
    { title: "WEDOS", url: "https://www.wedos.com/cs/?ap=Er80JB" },
    { title: "WEDOS Global", url: "https://www.wedos.com/cs/global/?ap=Er80JB" },
    { title: "WEDOS NIS2", url: "https://wedos.global/cs/nis2/?ap=Er80JB" },
    { title: "WEDOS webhosting", url: "https://www.wedos.com/cs/webhosting/?ap=Er80JB" },
    { title: "WEDOS Webhosting Managed Server (WMS)", url: "https://www.wedos.com/cs/wms/?ap=Er80JB" },
    { title: "WEDOS WebSite", url: "https://www.wedos.com/cs/website/?ap=Er80JB" },
    { title: "WEDOS mailhosting", url: "https://www.wedos.com/cs/mailhosting/?ap=Er80JB" },
    { title: "WEDOS domény", url: "https://www.wedos.com/cs/domeny/?ap=Er80JB" },
    { title: "WEDOS Cloud", url: "https://www.wedos.com/cs/cloud/?ap=Er80JB" },
    { title: "WEDOS virtuální servery", url: "https://www.wedos.com/cs/vps-on/?ap=Er80JB" },
    { title: "WEDOS dedikované servery", url: "https://www.wedos.com/cs/dedikovane-servery/?ap=Er80JB" },
    { title: "WEDOS Cloud Disk (CD)", url: "https://www.wedos.com/cs/cd/?ap=Er80JB" },
    { title: "WEDOS Disk", url: "https://www.wedos.com/cs/wedos-disk/?ap=Er80JB" }
  ];

  // Náhodný výběr reklamy
  const randomAd = reklamy[Math.floor(Math.random() * reklamy.length)];

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
            <p className="mt-2"><b>Kalkulačku služeb</b> můžete využít pro výpočet orientační ceny vašeho projektu. <a href="/kalkulacka/web" className="link">Přejít na kalkulačku</a></p>
            <p className="mt-2">Pokud máte zájem o <b>doučování nebo konzultace z oblasti IT</b>, můžete využít <a href="/kalkulacka/uceni" className="link">kalkulačku doučování</a>.</p>
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
        <div className="flex flex-row mt-6 mb-0">
          <Card className="w-full rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500">
          <Link href={randomAd.url} passHref>
            <h3 className="text-sm font-bold mb-2">Reklamní partnerství</h3>
            <div className="w-full p-2">
              <p className="mt-2 text-lg">
                {randomAd.title != "WEDOS" ? `${randomAd.title} se slevou! Klikněte zde pro více informací.`: "WEDOS - webhosting, domény a servery slevou! Klikněte zde pro více informací."}
              </p>
            </div>
          </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}