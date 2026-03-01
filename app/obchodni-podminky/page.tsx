"use client";

import Link from "next/link";

export default function ObchodniPodminky() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 leading-relaxed text-[17px]">
        <h1 className="text-4xl font-bold mb-8">Obchodní podmínky</h1>
        <p className="text-white/60 mb-12 text-sm">
          Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
        </p>

        <div className="space-y-10 text-white/90">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">1. Základní ustanovení</h2>
            <p>
              Tyto obchodní podmínky (dále jen <strong>„Podmínky“</strong>) upravují vztahy mezi
              poskytovatelem služeb a klientem v oblasti vývoje webových aplikací, programování a IT
              poradenství.
            </p>
            <p>
              <strong>Poskytovatelem služeb</strong> je Petr Vurm, IČ: 21180164, se sídlem Nechanice,
              Česká republika. <br />
              Kontakt:{" "}
              <a href="mailto:kontakt@petrvurm.cz" className="text-primary hover:underline">
                kontakt@petrvurm.cz
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">2. Předmět smlouvy</h2>
            <p>
              Předmětem smlouvy je dodání softwaru, webových aplikací nebo jiných IT řešení dle
              individuální dohody mezi poskytovatelem a klientem.
            </p>
            <p>
              Všechny práce jsou prováděny na základě individuální poptávky, cenové kalkulace a
              následného schválení klientem.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">3. Ceny a platební podmínky</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Základní sazba činí <strong>250 Kč / hod</strong> (neplátce DPH).</li>
              <li>
                U rozsáhlejších projektů může být stanovena smluvní cena nebo měsíční paušál.
              </li>
              <li>
                Platba probíhá převodem na účet č. <strong>7030514389 / 0800</strong>.
              </li>
              <li>
                Faktura je splatná do 14 dnů od vystavení, není-li sjednáno jinak.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">4. Dodací podmínky</h2>
            <p>
              Termín dodání je stanoven individuálně podle složitosti projektu. Poskytovatel nenese
              odpovědnost za zpoždění způsobené okolnostmi mimo jeho kontrolu (např. nedodání
              podkladů klientem, technické potíže třetích stran apod.).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">5. Autorská práva</h2>
            <p>
              Všechna autorská práva k vytvořenému softwaru, zdrojovým kódům, grafice či textům
              zůstávají ve vlastnictví poskytovatele, dokud není projekt plně uhrazen. Po uhrazení
              jsou práva převedena v rozsahu sjednaném ve smlouvě.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">6. Odpovědnost</h2>
            <p>
              Poskytovatel neodpovídá za škody způsobené nesprávným užíváním díla nebo jeho
              neautorizovanou úpravou. Rovněž nezaručuje nepřetržitou dostupnost hostingových služeb
              třetích stran.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">7. Reklamace a záruka</h2>
            <p>
              Na dodané služby je poskytována záruka funkčnosti po dobu 30 dnů od předání díla.
              Reklamace musí být uplatněna písemně na e-mail poskytovatele.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">8. Ochrana osobních údajů</h2>
            <p>
              Ochrana osobních údajů klientů se řídí dokumentem{" "}
              <Link href="/gdpr" className="text-primary hover:underline">
                Zásady ochrany osobních údajů (GDPR)
              </Link>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">9. Závěrečná ustanovení</h2>
            <p>
              Tyto podmínky jsou platné od 1. října 2025. Poskytovatel si vyhrazuje právo na jejich
              změnu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
