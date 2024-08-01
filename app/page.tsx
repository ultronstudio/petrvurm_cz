import {
  Card,
} from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary/80 py-20 text-center text-primary-foreground">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Petr Vurm
          </h1>
          <p className="mt-6 text-xl">
            Tvořím webové stránky a webové aplikace, software pro jednotlivce i
            firmy, a nebojím se nových projektů.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/projekty"
              className="transition-all duration-300 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2"
              prefetch={false}
            >
              Prohlédnout projekty
            </Link>
            <Link
              href="/kontakt"
              className="transition-all duration-300 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-black focus:outline-none focus:ring-2"
              prefetch={false}
            >
              Kontaktovat mě
            </Link>
          </div>
        </div>
      </section>
      <section id="services" className="py-10">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Co pro Vás mohu udělat?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                Kompletní tvorba webů
              </h3>
              <p className="mt-4 text-white">
                Navrhnu vzhled, implementuji redakční systém, připravím funkce
                webu podle vašich požadavků a mnohem víc.
              </p>
            </Card>
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                Webové aplikace na míru
              </h3>
              <p className="mt-4 text-white">
                Poradím vám, zda je pro vás vhodnější WordPress, generátor
                statických webů nebo potřebujete nějaké speciální řešení.
              </p>
            </Card>
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                Servis a údržba webů
              </h3>
              <p className="mt-4 text-white">
                Předáním hotového webu ještě naše spolupráce nekončí. Kromě
                postupného vylepšování se postarám i o zabezpečení a pravidelný
                servis vašeho webu.
              </p>
            </Card>
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                SEO poradenství
              </h3>
              <p className="mt-4 text-white">
                Web vám předám v perfektní kondici onepage SEO faktorů. V rámci
                naší spolupráce vám i ukáži, jak pracovat s obsahem pro
                návštěvníky a vyhledávače.
              </p>
            </Card>
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                Kurzy pro všechny
              </h3>
              <p className="mt-4 text-white">
                Pořádám kurzy a workshopy o tvorbě webových stránek a aplikací,
                na kterých se mohou něco nového naučit nejen začátečníci.
              </p>
            </Card>
            <Card className="p-6 hover:cursor-pointer scale-100 z-1 transition-all duration-500 hover:scale-125 hover:z-10">
              <h3 className="text-xl font-bold text-primary">
                Desktopová řešení
              </h3>
              <p className="mt-4 text-white">
                Aplikace pro počítač je pro mne hračkou. Jsem schopný vaši
                osobní nebo firemní potřebu proměnit v plně funkční počítačovou
                aplikaci.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section id="projects" className="py-10">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Moje projekty
          </h2>
          <p className="mt-6 text-muted-foreground">
            Tady jsou zobrazené tři projekty, které považuji za nejlepší
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-0">
              <img
                src="https://play-lh.googleusercontent.com/NHNwyXgyiTUCndaUGkNtRKMQgtuYCqHhCHsH-rD2dDi17lrSLZ_3SoDnv-fmuST0nt7b=w2560-h1440-rw"
                width={1280}
                height={720}
                alt="FakeTube"
                className="rounded-t-md object-cover aspect-auto"
              />
              <div className="p-4">
                <p className="font-bold text-xl">FakeTube</p>
                <p>Česká sociání síť pro sdílení videí</p>
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
          </div>
        </div>
      </section>
    </>
  );
}
