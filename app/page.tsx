import { Card } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
      <>
        {/* HERO sekce */}
        <section className="bg-primary/80 py-20 text-center text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Petr Vurm
            </h1>
            <p className="mt-6 text-xl">
              Pomáhám firmám, startupům i jednotlivcům proměnit jejich nápady v digitální řešení, která šetří čas, snižují náklady a přinášejí reálné výsledky.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                  href="/projekty"
                  className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2"
                  prefetch={false}
              >
                Moje projekty
              </Link>
              <Link
                  href="/kontakt"
                  className="transition-all duration-300 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-black focus:outline-none focus:ring-2"
                  prefetch={false}
              >
                Kontaktujte mě
              </Link>
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <section id="services" className="py-10">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Služby, na které se můžete spolehnout
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  Vývoj webových aplikací
                </h3>
                <p className="mt-4 text-white">
                  Navrhuji a vytvářím moderní webové platformy, firemní prezentace i komplexní aplikace, které podporují růst vašeho podnikání a zaujmou uživatele.
                </p>
              </Card>
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  Zakázkový software
                </h3>
                <p className="mt-4 text-white">
                  Realizuji software přesně podle vašich potřeb – od desktopových nástrojů po interní systémy, které vám ulehčí práci a zefektivní procesy.
                </p>
              </Card>
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  Integrace a automatizace
                </h3>
                <p className="mt-4 text-white">
                  Propojuji aplikace a systémy, automatizuji rutinní úkoly a pomáhám vám snížit chybovost i náklady. Vše navržené s ohledem na váš konkrétní provoz.
                </p>
              </Card>
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  UX & UI design
                </h3>
                <p className="mt-4 text-white">
                  Tvořím přehledné a moderní uživatelské rozhraní, které není jen hezké, ale hlavně funkční. Protože dobrý design prodává.
                </p>
              </Card>
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  Technologické poradenství
                </h3>
                <p className="mt-4 text-white">
                  Pomohu vám vybrat správné technologie, navrhnout architekturu systémů nebo zhodnotit vaše nápady ještě před tím, než investujete do vývoje.
                </p>
              </Card>
              <Card className="p-6 scale-100 z-1 transition-all duration-500 hover:scale-105 hover:z-10">
                <h3 className="text-xl font-bold text-primary">
                  Správa a podpora
                </h3>
                <p className="mt-4 text-white">
                  Vaše projekty nenechám bez dozoru. Poskytuji dlouhodobou podporu, správu a pravidelné aktualizace, aby vše fungovalo hladce a bez starostí.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* PROJEKTY */}
        <section id="projects" className="py-10">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vybrané projekty
            </h2>
            <p className="mt-6 text-muted-foreground">
              Ukázka projektů, na kterých jsem pracoval. Každý z nich je důkazem, že kvalitní software není jen o kódu, ale hlavně o lidech a jejich potřebách.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-0">
                <img
                    src="/images/projekty/faketube.jpg"
                    width={1280}
                    height={720}
                    alt="FakeTube"
                    className="rounded-t-sm object-cover aspect-video"
                />
                <div className="p-4">
                  <p className="font-bold text-xl">FakeTube</p>
                  <p>
                    Česká video platforma s vlastním přehrávačem, pokročilou správou obsahu a možností živého streamování.
                  </p>
                  <div className="mt-4 gap-3">
                    <Link
                        href="/projekty/faketube"
                        className="w-full transition-all justify-center duration-200 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary hover:bg-primary/80 hover:shadow-none"
                        prefetch={false}
                    >
                      Zobrazit detaily
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="p-0">
                <img
                    src="/images/projekty/hophub.png"
                    width={1280}
                    height={720}
                    alt="HopHub"
                    className="rounded-t-sm object-cover aspect-video"
                />
                <div className="p-4">
                  <p className="font-bold text-xl">HopHub</p>
                  <p>
                    Rozšíření pro prohlížeč, které umožňuje rychlý přístup k oblíbeným online nástrojům a výrazně zefektivňuje každodenní práci.
                  </p>
                  <div className="mt-4 gap-3">
                    <Link
                        href="/projekty/hophub"
                        className="w-full transition-all justify-center duration-200 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary hover:bg-primary/80 hover:shadow-none"
                        prefetch={false}
                    >
                      Zobrazit detaily
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </>
  );
}
