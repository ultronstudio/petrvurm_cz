"use client";

import Link from "next/link";
import { Card } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Clock } from "lucide-react";
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
  ApiIcon,
  CSharpIcon,
  TailwindIcon,
} from "@/Icons/Icons";

function getAge() {
  const today = new Date();
  const birthDate = new Date(2005, 9, 25); // 0‑based měsíc → 9 = říjen
  const diff = today.getTime() - birthDate.getTime();
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  return years;
}

function getFakeTubeAge() {
  // Oprava: měsíc je 0‑based → 11 = prosinec
  const created = new Date(2020, 11, 28);
  const today = new Date();
  let years = today.getFullYear() - created.getFullYear();
  let months = today.getMonth() - created.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

const techs = [
  { name: "HTML5", color: "#e34c26", text: "#fff", Icon: HTML5Icon },
  { name: "CSS3", color: "#264de4", text: "#fff", Icon: CSS3Icon },
  { name: "Sass", color: "#cc6699", text: "#fff", Icon: SassIcon },
  { name: "JavaScript", color: "#f0db4f", text: "#323330", Icon: JavaScriptIcon },
  { name: "TypeScript", color: "#007acc", text: "#fff", Icon: TypeScriptIcon },
  { name: "PHP", color: "#777bb4", text: "#fff", Icon: PHPIcon },
  { name: "React", color: "#61dafb", text: "#111", Icon: ReactIcon },
  { name: "Next.js", color: "#fff", text: "#000", Icon: NextJsIcon },
  { name: "Node.js", color: "#339933", text: "#fff", Icon: NodeJsIcon },
  { name: "Laravel", color: "#F05340", text: "#fff", Icon: LaravelIcon },
  { name: "Livewire", color: "#FB70A9", text: "#fff", Icon: LaravelLivewireIcon },
  { name: "MariaDB", color: "#00758f", text: "#fff", Icon: MariaDbIcon },
  { name: "Git", color: "#F1502F", text: "#fff", Icon: GitIcon },
  { name: "API", color: "#2f2f2f", text: "#fff", Icon: ApiIcon },
  { name: "C#", color: "#239120", text: "#fff", Icon: CSharpIcon },
  { name: "Tailwind CSS", color: "#44a8b3", text: "#fff", Icon: TailwindIcon },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06 } }),
};

export default function OMne() {
  const age = getAge();
  const { years, months } = getFakeTubeAge();

  const yearsLabel = years === 1 ? "1 rok" : years > 1 && years < 5 ? `${years} roky` : `${years} let`;
  const monthsLabel = months === 1 ? "1 měsíc" : months > 1 && months < 5 ? `${months} měsíce` : `${months} měsíců`;

  // const avatarImage = "/images/portrait.jpg"; // produkce
  const avatarImage = null; // vývoj

  return (
    <section className="relative py-12">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* HERO */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" className="text-3xl md:text-5xl font-extrabold tracking-tight">
              O mně
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} initial="hidden" animate="show" className="mt-3 text-white/80 text-sm md:text-base leading-7">
              Jmenuji se Petr Vurm. Je mi {age} let a působím jako full‑stack vývojář webových aplikací. Kombinuji
              moderní frontendové technologie s robustním backendem a dbám na čistý kód, bezpečnost a udržitelnost.
            </motion.p>

            {/* KPI karty */}
            <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                <div className="text-3xl font-extrabold text-primary">{years + (months > 0 ? 1 : 0)}+</div>
                <div className="text-xs text-white/70">let praxe s weby</div>
              </Card>
              <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                <div className="text-3xl font-extrabold text-primary">{yearsLabel}</div>
                <div className="text-xs text-white/70">vývoje FakeTube</div>
              </Card>
              <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                <div className="text-3xl font-extrabold text-primary">10+</div>
                <div className="text-xs text-white/70">menších projektů</div>
              </Card>
              <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                <div className="text-3xl font-extrabold text-primary">24/7</div>
                <div className="text-xs text-white/70">důraz na provoz</div>
              </Card>
            </motion.div>
          </div>

          {/* PORTRAIT */}
          <motion.img
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={avatarImage || "https://www.gravatar.com/avatar/?d=mp&s=360"}
            alt="Petr Vurm"
            className="mx-auto aspect-[3/4] w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/10 object-cover shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* STORY */}
        <motion.div className="mt-10 grid gap-6 md:grid-cols-2" variants={fadeUp} initial="hidden" animate="show">
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Clock className="h-5 w-5 text-primary"/> Jak to začalo</h2>
            <p className="mt-3 text-white/80 leading-7">
              S webem jsem začal v roce 2017 v kroužku tvorby webových stránek. Po jeho zrušení jsem se učil samostatně –
              od HTML a CSS přes JavaScript až k vývoji aplikací. Během pandemie jsem díky darovanému notebooku mohl
              pokračovat v online výuce a po škole programovat. První aplikací byl jednoduchý blog.
            </p>
          </Card>
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Briefcase className="h-5 w-5 text-primary"/> Čemu se věnuji nyní</h2>
            <p className="mt-3 text-white/80 leading-7">
              Zaměřuji se na vývoj webových aplikací a služeb s důrazem na výkon a bezpečnost. Můj největší projekt je
              česká video platforma <strong>FakeTube</strong>, na které pracuji {yearsLabel} a {monthsLabel}. Na střední škole jsem založil tým
              <Link className="text-primary hover:underline ml-1" href="https://sspt.petrvurm.cz" target="_blank" rel="noopener">ŠSPT</Link>,
              kde vyvíjíme software pro školu a školní akce.
            </p>
          </Card>
        </motion.div>

        {/* EDUCATION & CERTS */}
        <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={fadeUp} initial="hidden" animate="show">
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-primary"/> Vzdělání</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <div className="font-medium">SPŠ, SOŠ a SOU Hradec Králové</div>
                <div className="text-white/70">2021 – dosud • Informační technologie</div>
                <Link href="https://www.hradebni.cz" className="text-primary hover:underline" target="_blank">Navštívit web</Link>
              </li>
              <li>
                <div className="font-medium">ZŠ a MŠ Nechanice</div>
                <div className="text-white/70">2012 – 2021 • Všeobecné vzdělání</div>
                <Link href="https://www.zsnechanice.cz" className="text-primary hover:underline" target="_blank">Navštívit web</Link>
              </li>
            </ul>
          </Card>

          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><Award className="h-5 w-5 text-primary"/> Certifikáty</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <div className="font-medium">DofE – bronzová úroveň</div>
                <div className="text-white/70">Uděleno 13. 2. 2025 (splněno 20. 11. 2024) • Organizace DofE ČR</div>
                <Link href="/docs/certificates/dofe/bronze.pdf" className="text-primary hover:underline" target="_blank">Zobrazit certifikát</Link>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* TECH STACK */}
        <motion.div className="mt-10" variants={fadeUp} initial="hidden" animate="show">
          <h2 className="text-2xl font-bold">Technologie, které používám</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {techs.map(({ name, color, text, Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-semibold ring-1 ring-white/20"
                style={{ backgroundColor: color, color: text }}
              >
                {Icon ? <Icon className="h-4 w-4" style={{ fill: text }} /> : null}
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-12" variants={fadeUp} initial="hidden" animate="show">
          <Card className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur md:flex-row md:text-left">
            <div>
              <h3 className="text-lg font-semibold">Hledáte spolehlivého vývojáře?</h3>
              <p className="text-sm text-white/80">Krátká konzultace pomůže upřesnit rozsah, milníky a rozpočet.</p>
            </div>
            <Link href="/kontakt" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-primary/90">Nezávazně mě kontaktovat</Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
