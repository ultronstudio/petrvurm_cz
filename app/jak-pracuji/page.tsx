"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@radix-ui/themes";
import { MessageSquare, Pencil, Code, TestTube, Rocket, Headphones, ArrowRight, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06 } }),
};

export default function JakPracuji() {
  const steps = [
    {
      number: "1",
      title: "Konzultace",
      description: "Nejdřív si detailně popovídáme. Zjistím tvé cíle, omezení, rozpočet a časový plán. Bez překvapení později.",
      Icon: MessageSquare,
      duration: "1-2 dny",
      outcome: "Jasný brief a návrh řešení"
    },
    {
      number: "2",
      title: "Návrh & Plánování",
      description: "Předložím ti wireframy, architekturu a harmonogram. Všechno se projedná, než by se napsal jeden řádek kódu.",
      Icon: Pencil,
      duration: "3-7 dní",
      outcome: "Schválený návrh a rozpis"
    },
    {
      number: "3",
      title: "Vývoj",
      description: "Začína kódování. Pracuji iterativně – každý týden dostaneš update. Kvalita kódu a transparentnost jsou priorita.",
      Icon: Code,
      duration: "2-12 týdnů",
      outcome: "Funkční aplikace"
    },
    {
      number: "4",
      title: "Testování",
      description: "Důsledné testování: funkční testy, bezpečnost, výkon. Předám ti seznam všech zjištěných chyb a jak jsou opraveny.",
      Icon: TestTube,
      duration: "1-2 týdny",
      outcome: "Certifikace kvality"
    },
    {
      number: "5",
      title: "Spuštění",
      description: "Nasazení na produkci. Jsem k dispozici během spuštění, připravený řešit cokoliv, co by mohlo jít špatně.",
      Icon: Rocket,
      duration: "1 den",
      outcome: "Live na webu"
    },
    {
      number: "6",
      title: "Podpora & Údržba",
      description: "Projekt nekončí spuštěním. Jsem tady pro opravy, vylepšení a nové funkce. Garantuji podporu i po měsících.",
      Icon: Headphones,
      duration: "Průběžně",
      outcome: "Stabilní provoz"
    }
  ];

  return (
    <section className="relative py-12">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Jak pracuji</h1>
          <p className="mt-4 max-w-3xl text-white/80 text-lg">
            Transparentní, spolehlivý proces. Bez překvapení, bez schovaných nákladů. Stále v kontaktu od prvního rozhovoru až po dlouhodobou podporu.
          </p>
        </motion.div>

        {/* PROCESS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ number, title, description, Icon, duration, outcome }, i) => (
            <motion.div
              key={number}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
            >
              <Card className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                {/* Number badge */}
                <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-extrabold text-primary">{number}</span>
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex rounded-lg bg-primary/20 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{description}</p>

                {/* Meta info */}
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-white/60">Očekávaná doba</p>
                    <p className="text-sm font-semibold text-white">{duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Výstup</p>
                    <p className="text-sm font-semibold text-white">{outcome}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Co riguarantuju</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "✓ Transparentní komunikaci – vždy víš, na čem se pracuje",
              "✓ Termíny dodržuji – plánování je přesné",
              "✓ Kvalitní kód – udržitelný a testovaný",
              "✓ Bezpečnost – HTTPS, ochrana dat, bezpečnostní audit",
              "✓ Performance – web bude rychlý a efektivní",
              "✓ SEO optimalizace – viditelnost v Google"
            ].map((item, i) => (
              <div key={item} className="flex gap-3 items-start">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Chceš vědět víc?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Domluvme si konzultaci. Bez závazků, bez schování. Jen otevřená diskuse o tom, jak bych ti mohl pomoci.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-black shadow-[0_8px_30px_rgba(0,183,239,0.35)] transition hover:bg-primary/90"
            prefetch={false}
          >
            Nezávazná konzultace <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.section>
      </div>
    </section>
  );
}
