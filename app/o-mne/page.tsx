import {
  HTML5Icon,
  CSS3Icon,
  JavaScriptIcon,
  TypeScriptIcon,
  ReactIcon,
  NextJsIcon,
  NodeJsIcon,
  LaravelIcon,
  LaravelLivewireIcon,
  MariaDbIcon,
  GitIcon,
  SassIcon,
  PHPIcon,
} from "@/Icons/Icons";
import { Card } from "@radix-ui/themes";
import Link from "next/link";

export default function Kontakt() {
  const getAge = (): number => {
    const today = new Date();
    const birthDate = new Date(2005, 9, 25);
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const millisecondsInOneYear = 365.25 * 24 * 60 * 60 * 1000; // zohlednění přestupných roků
    return ageInMilliseconds / millisecondsInOneYear;
  };

  const getFakeTubeAge = (): { years: number; months: number } => {
    const today = new Date();
    const fakeTubeCreated = new Date(2020, 12, 28);
    const ageInMilliseconds = today.getTime() - fakeTubeCreated.getTime();

    const ageDate = new Date(ageInMilliseconds);
    let years = ageDate.getUTCFullYear() - 1970; // because the epoch is 1970
    let months = ageDate.getUTCMonth();

    if (months >= 12) {
      years += 1;
      months -= 12;
    }

    return { years, months };
  };

  const { years, months } = getFakeTubeAge();
  const yearsString =
    years === 1
      ? "1 rok"
      : years > 1 && years < 5
      ? `${years} roky`
      : `${years} let`;
  const monthString =
    months === 1
      ? "1 měsíc"
      : months > 1 && months < 5
      ? `${months} měsíce`
      : `${months} měsíců`;

  return (
    <section id="services" className="py-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            O mně
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="w-full pr-0 md:pr-4 lg:pr-4 xl:pr-4 text-justify">
            {/* úvodní text s počítadlem roků */}
            <p>
              Ahoj, jmenuji se Petr Vurm, je mi {Math.floor(getAge())}&nbsp;let
              a jsem full-stack web developer, programátor a student střední
              průmyslové školy v Hradci Králové.
            </p>
            <p className="mt-3">
              Věnuji se tvorbě webů více než 7 let a během této doby jsem
              vystřídal mnoho projektů a technologií. Mým cílem je vytvářet
              kvalitní a moderní webové stránky a aplikace, které budou splňovat
              požadavky zákazníků a budou mít přidanou hodnotu.
            </p>
            <h2 className="mt-4 text-2xl font-bold">Jak to začalo</h2>
            <p>
              S weby jsem začal v&nbsp;roce 2017, kdy jsem začal ve škole
              docházet na kroužek tvorby webových stránek, kde jsem se naučil
              základní potřebné věci pro tvorbu jednoduchých a prakticky
              obyčejných webových stránek.
            </p>
            <p className="mt-3">
              Bohužel v polovimě školního roku (tedy v&nbsp;roce 2018) se
              kroužek zrušil a já jsem se rozhodl pokračovat v učení tvorby
              webových stránek sám. Začal jsem se více učit HTML, CSS a
              JavaScript a postupně jsem se tak dostal k&nbsp;vývoji webových
              aplikací.
            </p>
            <p className="mt-3">
              Ještě dřív, než jsem vytvořil web, který by se dal nazývat
              aplikací, předcházela tomu pandemie koronaviru. Jelikož jsem z
              důvodu, abych se mohl učit tvořit webové stránky, nemohl v době
              pandemie dojíždět do hradecké knihovny, kde jsem na místních
              počítačích v poznámkovém bloku psal své první kódy, z počátku jsem
              se učil z&nbsp;knih, které jsem už měl doma. A proč z knih a ne z
              internetu? Protože jsem neměl internet. Tedy, respektive jsem měl,
              ale neměl jsem zařízení, na kterém bych mohl internet používat -
              ani mobil, ani počítač či notebook.
            </p>
            <p className="mt-3">
              Až v&nbsp;roce 2020 mi darovala ředitelka základní školy notebook,
              díky kterému jsem se dopoledne mohl účastnit online výuky a
              odpoledne se učit tvořit webové stránky. A tak jsem vytvořil svou
              první webovou aplikaci (podle návodu samozřejmě) - jednoduchý
              blog.
            </p>
          </div>
          <img
            src="https://placehold.co/720x1280/00b7ef/FFFFFF/png?text=720x1280&font=Roboto"
            alt="Fotka Mě"
            className="hidden sticky top-0 sm:max-w-[310px] sm:max-h-[550px] md:block lg:block xl:block"
          />
        </div>
        <section className="w-full mt-10">
          <h2 className="mb-2 text-2xl font-bold">Navštěvované školy</h2>
          <div className="container grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          <Card className="rounded-sm bg-background p-8 transition-all scale-100 hover:scale-120">
              <div>
                <h3 className="text-lg font-semibold">
                  SPŠ, SOŠ a SOU, Hradec Králové
                </h3>
                <p className="text-sm mt-1 text-muted-foreground">
                  2021 - dosud
                </p>
                <p className="text-sm mt-1 text-muted-foreground">
                  Obor Informační technologie
                </p>
              </div>
              <p className="mt-2">
                <Link href="https://www.hradebni.cz" className="link" target="_blank" prefetch={false}>
                  Navštívit web
                </Link>
              </p>
            </Card>
            <Card className="rounded-sm bg-background p-8 transition-all scale-100 hover:scale-120">
              <div>
                <h3 className="text-lg font-semibold">ZŠ a MŠ Nechanice</h3>
                <p className="text-sm mt-1 text-muted-foreground">
                  2012 - 2021
                </p>
                <p className="text-sm mt-1 text-muted-foreground">
                  Všeobecné vzdělání
                </p>
              </div>
              <p className="mt-2">
                <Link href="https://www.zsnechanice.cz" className="link" target="_blank" prefetch={false}>
                  Navštívit web
                </Link>
              </p>
            </Card>
          </div>
        </section>
        {/* technologie */}
        <div className="mt-10 text-justify">
          <h2 className="mt-4 text-2xl font-bold">Co dělám teď</h2>
          <p>
            Od té doby jsem se začal více věnovat vývoji webových aplikací a
            vytvořil jsem několik menších projektů, které mi pomohly zlepšit se
            v&nbsp;programování a ve&nbsp;tvorbě webových stránek.
          </p>
          <p className="mt-3">
            Jedním z mých projektů je i česká sociální síť FakeTube, kde mohou
            uživatelé sdílet své videa, komentovat videa jiných uživatelů a
            sledovat oblíbené tvůrce. FakeTube je můj největší projekt, který
            jsem vytvořil a na kterém jsem pracoval nejvíce (právě je to přesně{" "}
            {yearsString} a {monthString} od doby, kdy jsem začal pracovat na
            FakeTube).
          </p>
          <h3 className="mt-6 text-xl font-bold">Technologie, jaké používám</h3>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2 font-bold justify-center">
              <div className="bg-[#e34c26] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <HTML5Icon className="w-5 h-5 fill-white" />
                <p>HTML5</p>
              </div>
              <div className="bg-[#264de4] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <CSS3Icon className="w-5 h-5 fill-white" />
                <p>CSS3</p>
              </div>
              <div className="bg-[#cc6699] text-[#fff] cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <SassIcon className="w-5 h-5 fill-[#fff]" />
                <p>Sass</p>
              </div>
              <div className="bg-[#f0db4f] text-[#323330] cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <JavaScriptIcon className="w-5 h-5 fill-[#323330]" />
                <p>JavaScript</p>
              </div>
              <div className="bg-[#007acc] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <TypeScriptIcon className="w-4 h-4 fill-white" />
                <p>TypeScript</p>
              </div>
              <div className="bg-[#777bb4] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <PHPIcon className="w-4 h-4 fill-white" />
                <p>PHP</p>
              </div>
              <div className="bg-[#61dafb] text-[#323330] cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <ReactIcon className="w-5 h-5 fill-[#323330]" />
                <p>React</p>
              </div>
              <div className="bg-white text-black cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <NextJsIcon className="w-5 h-5 fill-black" />
                <p>Next.js</p>
              </div>
              <div className="bg-[#339933] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <NodeJsIcon className="w-5 h-5 fill-white" />
                <p>Node.js</p>
              </div>
              <div className="bg-[#F05340] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <LaravelIcon className="w-5 h-5 fill-white" />
                <p>Laravel</p>
              </div>
              <div className="bg-[#FB70A9] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <LaravelLivewireIcon className="w-5 h-5 fill-white" />
                <p>Laravel Livewire</p>
              </div>
              <div className="bg-[#00758f] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <MariaDbIcon className="w-5 h-5 fill-white" />
                <p>MariaDB</p>
              </div>
              <div className="bg-[#F1502F] text-white cursor-pointer p-2 rounded-md flex gap-1 items-center">
                <GitIcon className="w-5 h-5 fill-white" />
                <p>Git</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
