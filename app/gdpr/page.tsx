"use client";

import Link from "next/link";

export default function GDPR() {
  const lastUpdated = new Date("2025-10-04");

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 leading-relaxed text-[17px]">
        <h1 className="text-4xl font-bold mb-8">Zásady ochrany osobních údajů (GDPR)</h1>
        <p className="text-white/60 mb-12 text-sm">
          Poslední aktualizace: {lastUpdated.toLocaleDateString("cs-CZ")}
        </p>

        <div className="space-y-10 text-white/90">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">1. Správce osobních údajů</h2>
            <p>
              Správcem osobních údajů je <strong>Petr Vurm</strong>, IČ: 21180164, se sídlem
              Nechanice, Česká republika. <br />
              Kontakt:{" "}
              <a href="mailto:kontakt@petrvurm.cz" className="text-primary hover:underline">
                kontakt@petrvurm.cz
              </a>
              .
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">2. Jaké údaje zpracovávám</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Jméno, příjmení a kontaktní údaje (e-mail, telefon).</li>
              <li>Fakturační údaje pro účely účetnictví.</li>
              <li>Technické údaje z webu (IP adresa, cookies, analytické údaje).</li>
              <li>Veškeré informace poskytnuté při komunikaci se zákazníkem.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">3. Účel zpracování</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Plnění smlouvy a poskytování služeb (vývoj webů, konzultace).</li>
              <li>Komunikace se zákazníkem a vyřízení dotazů.</li>
              <li>Plnění zákonných povinností (účetnictví, daně).</li>
              <li>Marketingová komunikace se souhlasem subjektu údajů.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">4. Doba uchování údajů</h2>
            <p>Osobní údaje jsou uchovávány pouze po nezbytně nutnou dobu:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Účetní doklady – 10 let.</li>
              <li>Komunikace a poptávky – maximálně 2 roky.</li>
              <li>Marketing – do odvolání souhlasu.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">5. Předávání třetím stranám</h2>
            <p>
              Osobní údaje mohou být předány pouze důvěryhodným partnerům zajišťujícím technickou
              infrastrukturu (např. hosting, e-mail, cloudové úložiště). Všichni zpracovatelé jsou
              smluvně vázáni dodržováním zásad GDPR.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">6. Práva subjektů údajů</h2>
            <p>Máte právo:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Požadovat přístup ke svým osobním údajům.</li>
              <li>Požadovat opravu nebo výmaz osobních údajů.</li>
              <li>Vznést námitku proti zpracování osobních údajů.</li>
              <li>Požadovat přenositelnost údajů.</li>
              <li>Podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">7. Závěrečná ustanovení</h2>
            <p>
              Tyto zásady mohou být průběžně aktualizovány.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
