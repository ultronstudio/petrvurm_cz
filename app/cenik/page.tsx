"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@radix-ui/themes";
import { ArrowRight, Check, Code, Lightbulb, Headphones, Monitor } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06 } }),
};

export default function Cenik() {
  const services = [
    {
      category: "Webové služby",
      icon: Monitor,
      items: [
        { name: "Jednoduchý web", price: "3 500 Kč", description: "Jednostránkový web, prezentace" },
        { name: "Standardní web", price: "8 000 Kč", description: "5-10 stran, CMS, SEO" },
        { name: "E-shop", price: "15 000 Kč+", description: "Online obchod s katalogem, platby" },
        { name: "Webová aplikace", price: "od 30 000 Kč", description: "Komplexní řešení, databáze, API" },
      ]
    },
    {
      category: "IT Služby",
      icon: Headphones,
      items: [
        { name: "Mesh Wi-Fi", price: "1 500 Kč+", description: "Instalace, bez vrtání" },
        { name: "Tiskárny & TV", price: "800 Kč", description: "Připojení, konfigurace" },
        { name: "IT Konzultace", price: "350 Kč/h", description: "Online nebo osobně" },
        { name: "Správa serveru", price: "2 000 Kč/m", description: "Monitoring, zálohy, bezpečnost" },
      ]
    },
    {
      category: "Školení & Kurzy",
      icon: Code,
      items: [
        { name: "Doučování", price: "300 Kč/h", description: "Programování, IT" },
        { name: "Skupina 3-5 osob", price: "250 Kč/h", description: "Zajímavější cena" },
        { name: "Firemní školení", price: "na výzvu", description: "Customizované" },
      ]
    },
    {
      category: "Poradenství",
      icon: Lightbulb,
      items: [
        { name: "Konzultace", price: "zdarma", description: "Jednorázová, bez závazku" },
        { name: "Analýza & Návrh", price: "5 000 Kč", description: "Audit, doporučení" },
        { name: "Dlouhodobá podpora", price: "5 000 Kč/m", description: "Prioritní podpora, vývoj" },
      ]
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
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Ceník & Služby</h1>
          <p className="mt-4 max-w-3xl text-white/80 text-lg">
            Transparentní ceny bez skrytých nákladů. Vyberi si službu, kterou potřebuješ – nebo si nech navrhnout kombinaci.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map(({ category, icon: Icon, items }, categoryIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={categoryIdx}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-lg bg-primary/20 p-2 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category}</h2>
                </div>

                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div
                      key={item.name}
                      className="border-b border-white/10 pb-4 last:border-0"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <span className="text-primary font-bold whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-sm text-white/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FEATURES */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Co je součástí každého projektu?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Konzultace a plánování",
              "Responsive design (mobil, tablet, PC)",
              "SEO optimalizace",
              "Testování & QA",
              "Nasazení na produkci",
              "1 měsíc bezplatné opravy",
              "Dokumentace kódu",
              "Instrukce pro správu"
            ].map((feature, i) => (
              <div key={feature} className="flex gap-3">
                <span className="text-primary flex-shrink-0">•</span>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CALCULATORS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Interaktivní kalkulačky</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/kalkulacka/web"
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur hover:border-primary/50 hover:bg-white/10 transition"
              prefetch={true}
            >
              <h3 className="text-xl font-bold text-white mb-2">Kalkulačka Webů</h3>
              <p className="text-white/70 mb-4">Vyberi si služby a vidíš cenu v reálném čase s DPH.</p>
              <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition">
                Otevřít <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link
              href="/kalkulacka/uceni"
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur hover:border-primary/50 hover:bg-white/10 transition"
              prefetch={true}
            >
              <h3 className="text-xl font-bold text-white mb-2">Kalkulačka Kurzů</h3>
              <p className="text-white/70 mb-4">Spočítej si cenu školení, doučování či skupinového kurzu.</p>
              <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition">
                Otevřít <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Nevíš, kde začít?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Domluvme si konzultaci. Pomohu ti vybrat správnou službu pro tvé potřeby.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-black shadow-[0_8px_30px_rgba(0,183,239,0.35)] transition hover:bg-primary/90"
            prefetch={true}
          >
            Nezávazná konzultace <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.section>
      </div>
    </section>
  );
}