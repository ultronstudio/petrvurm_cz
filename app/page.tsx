"use client";

import { Card } from "@radix-ui/themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Cog, Link2, Layout, Lightbulb, ShieldCheck, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06 } }),
};

export default function Home() {
  return (
    <section className="relative py-12">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Petr Vurm
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-3xl text-lg md:text-xl text-white/80"
          >
            Pomáhám firmám, startupům i jednotlivcům převádět záměry do funkčních digitálních řešení.
            Doručuji měřitelný užitek: zrychlení procesů, snížení nákladů a stabilní provoz.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/projekty"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,183,239,0.35)] transition hover:translate-y-[-1px] hover:bg-primary/90 focus:outline-none focus:ring-2"
              prefetch={false}
              aria-label="Zobrazit projekty"
            >
              Moje projekty <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-[1px] hover:border-white/30 focus:outline-none focus:ring-2"
              prefetch={false}
            >
              Nezávazná konzultace
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 md:py-18">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-6 flex items-end justify-between"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Služby, na které se můžete spolehnout</h2>
            <Link href="/cenik" className="hidden md:inline-flex items-center gap-2 text-primary hover:underline" prefetch={false}>
              Ceník a kalkulace <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Vývoj webových aplikací",
                text: "Návrh a realizace moderních webových platforem a prezentací s důrazem na výkon a udržitelnost.",
                Icon: Code,
              },
              {
                title: "Zakázkový software",
                text: "Řešení vytvářená na míru – od interních nástrojů po desktopové aplikace, zaměřená na efektivitu procesů.",
                Icon: Cog,
              },
              {
                title: "Integrace a automatizace",
                text: "Propojování systémů, API a automatizace rutinních činností s cílem snížit chybovost i náklady.",
                Icon: Link2,
              },
              {
                title: "UX & UI design",
                text: "Srozumitelná a estetická rozhraní, která podporují obchodní cíle a přinášejí kvalitní uživatelskou zkušenost.",
                Icon: Layout,
              },
              {
                title: "Technologické poradenství",
                text: "Volba technologií, návrh architektury a posouzení záměrů před investicí do vývoje.",
                Icon: Lightbulb,
              },
              {
                title: "Správa a podpora",
                text: "Dlouhodobý dohled nad projekty, aktualizace a péče o bezproblémový provoz.",
                Icon: ShieldCheck,
              },
            ].map(({ title, text, Icon }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
              >
                <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition will-change-transform hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/20 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/80">{text}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-6 md:py-5">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Vybrané projekty
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-4 max-w-3xl text-white/70"
          >
            Níže uvedené ukázky představují realizace s důrazem na spolehlivý provoz, bezpečnost a přehlednou správu obsahu.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              {
                href: "/projekty/faketube",
                img: "/images/projekty/faketube.jpg",
                title: "FakeTube",
                text: "Česká video platforma s vlastním přehrávačem, správou obsahu a podporou živého vysílání.",
              },
              {
                href: "/projekty/hophub",
                img: "/images/projekty/hophub.png",
                title: "HopHub",
                text: "Rozšíření pro prohlížeč s rychlým přístupem k pracovním nástrojům a automatizacím.",
              },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="relative">
                  <img src={p.img} alt={p.title} className="aspect-video w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{p.text}</p>
                  <div className="mt-4">
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
                      prefetch={false}
                    >
                      Zobrazit detaily <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative py-6 md:py-5">
        <div className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-32" />
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur md:flex-row md:text-left">
            <div>
              <h3 className="text-xl font-semibold">Potřebujete spolehlivého partnera pro vývoj?</h3>
              <p className="mt-1 text-sm text-white/80">Krátká úvodní konzultace pomůže přesně vymezit rozsah a časový plán.</p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
              prefetch={false}
            >
              Domluvit konzultaci <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
