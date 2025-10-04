"use client";

import { Card } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Calculator, ExternalLink } from "lucide-react";

type Ad = { title: string; url: string };

export default function Kontakt() {
  const reklamy: Ad[] = useMemo(
    () => [
      { title: "WEDOS", url: "https://www.vedos.cz/?ap=Er80JB" },
      { title: "WEDOS webhosting", url: "https://www.vedos.cz/webhosting/?ap=Er80JB" },
      { title: "WEDOS Webhosting Managed Server (WMS)", url: "https://www.vedos.cz/wms/?ap=Er80JB" },
      { title: "WEDOS WebSite", url: "https://www.vedos.cz/website/?ap=Er80JB" },
      { title: "WEDOS mailhosting", url: "https://www.vedos.cz/mailhosting/?ap=Er80JB" },
      { title: "WEDOS domény", url: "https://www.vedos.cz/domeny/?ap=Er80JB" },
      { title: "WEDOS Cloud", url: "https://www.vedos.cz/cloud/?ap=Er80JB" },
      { title: "WEDOS virtuální servery", url: "https://www.vedos.cz/vps-on/?ap=Er80JB" },
      { title: "WEDOS dedikované servery", url: "https://www.vedos.cz/dedikovane-servery/?ap=Er80JB" }
    ],
    []
  );

  const [randomAd, setRandomAd] = useState<Ad | null>(null);

  useEffect(() => {
    setRandomAd(reklamy[Math.floor(Math.random() * reklamy.length)]);
  }, [reklamy]);

  return (
    <section className="relative py-12">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Kontaktujte mě</h1>
          <p className="mt-2 max-w-3xl text-white/80">
            Preferujete e-mail nebo krátký telefonát. Na zprávy reaguji zpravidla do 24 hodin.
          </p>
        </motion.div>

        {/* CONTACT ACTIONS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">E-mail</h3>
            </div>
            <p className="mt-2 text-white/80">Nejlepší kanál pro prvotní poptávku a sdílení podkladů.</p>
            <a
              href="mailto:kontakt@petrvurm.cz?subject=Poptávka&body=Dobrý%20den%2C%20rád%20bych..."
              className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
            >
              Napsat e-mail
            </a>
          </Card>

          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Telefon</h3>
            </div>
            <p className="mt-2 text-white/80">
              Krátké dotazy a domluva termínu hovoru.
            </p>
          </Card>
        </div>

        {/* INFO ROWS */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Kalkulačka</h3>
            </div>
            <p className="mt-2 text-white/80">
              Pro orientační rozpočet využijte kalkulačku služeb nebo výuky.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/kalkulacka/web"
                className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
                prefetch={false}
              >
                Web – kalkulačka
              </Link>
              <Link
                href="/kalkulacka/uceni"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/10"
                prefetch={false}
              >
                Doučování – kalkulačka
              </Link>
            </div>
          </Card>

          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Další informace</h3>
            </div>
            <dl className="mt-2 grid grid-cols-1 gap-2 text-white/80 text-sm">
              <div>
                <dt className="font-medium text-white">IČ</dt>
                <dd>21180164</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Číslo účtu</dt>
                <dd>7030514389/0800</dd>
              </div>
              <div>
                <dt className="font-medium text-white">IBAN</dt>
                <dd>CZ46&nbsp;0800&nbsp;0000&nbsp;0070&nbsp;3051&nbsp;4389</dd>
              </div>
              <div>
                <dt className="font-medium text-white">E-mail</dt>
                <dd>
                  <a href="mailto:kontakt@petrvurm.cz" className="text-primary hover:underline">
                    kontakt@petrvurm.cz
                  </a>
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        {/* PARTNER BANNER */}
        {randomAd && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/60 to-white/10 p-0">
              <Link
                href={randomAd.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5"
                prefetch={false}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-black/90 dark:text-white">
                      Reklamní partnerství
                    </h3>
                    <p className="mt-1 text-white/90">
                      {randomAd.title !== "WEDOS"
                        ? `${randomAd.title} se slevou – více informací po kliknutí.`
                        : "WEDOS – webhosting, domény a servery se slevou. Klikněte pro detaily."}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white/90" />
                </div>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
