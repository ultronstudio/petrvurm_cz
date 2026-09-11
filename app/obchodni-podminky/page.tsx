import Link from 'next/link';

export default function ObchodniPodminky() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4 text-[17px] leading-relaxed md:px-6">
        <h1 className="mb-8 text-4xl font-bold">Obchodní podmínky</h1>
        <p className="mb-12 text-sm text-white/60">Poslední aktualizace: 10. 9. 2026</p>
        <div className="space-y-10 text-white/90">
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">1. Základní ustanovení</h2><p>Tyto obchodní podmínky (dále jen <strong>„Podmínky“</strong>) upravují vztahy mezi poskytovatelem služeb a klientem v oblasti vývoje webových aplikací, programování a IT poradenství.</p><p><strong>Poskytovatelem služeb</strong> je Petr Vurm, IČ: 21180164, se sídlem Nechanice, Česká republika.<br />Kontakt: <a href="mailto:kontakt@petrvurm.cz" className="text-primary hover:underline">kontakt@petrvurm.cz</a></p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">2. Předmět smlouvy</h2><p>Předmětem smlouvy je dodání softwaru, webových aplikací nebo jiných IT řešení dle individuální dohody mezi poskytovatelem a klientem.</p><p>Všechny práce jsou prováděny na základě individuální poptávky, cenové nabídky a následného schválení klientem.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">3. Ceny a platební podmínky</h2><ul className="list-disc space-y-1 pl-6"><li>Cena služby je stanovena podle aktuální nabídky poskytovatele nebo individuální cenové nabídky odsouhlasené zákazníkem.</li><li>U rozsáhlejších projektů může být stanovena smluvní cena nebo měsíční paušál.</li><li>Platba probíhá převodem na účet uvedený na vystaveném dokladu, není-li dohodnuto jinak.</li><li>Faktura je splatná do 14 dnů od vystavení, není-li sjednáno jinak.</li></ul></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">4. Dodací podmínky</h2><p>Termín dodání je stanoven individuálně podle rozsahu projektu. Poskytovatel nenese odpovědnost za zpoždění způsobené okolnostmi mimo jeho kontrolu, například nedodáním podkladů klientem nebo technickými potížemi třetích stran.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">5. Autorská práva</h2><p>Všechna autorská práva k vytvořenému softwaru, zdrojovým kódům, grafice či textům zůstávají ve vlastnictví poskytovatele, dokud není projekt plně uhrazen. Po uhrazení jsou práva poskytnuta nebo převedena v rozsahu sjednaném pro konkrétní projekt.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">6. Odpovědnost</h2><p>Poskytovatel neodpovídá za škody způsobené nesprávným užíváním díla nebo jeho neautorizovanou úpravou. Rovněž nezaručuje nepřetržitou dostupnost služeb třetích stran.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">7. Reklamace</h2><p>Případné vady dodaného řešení je možné oznámit písemně na e-mail poskytovatele. Konkrétní podmínky podpory a odstraňování vad mohou být upřesněny v individuální nabídce nebo smlouvě.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">8. Ochrana osobních údajů</h2><p>Ochrana osobních údajů klientů se řídí dokumentem <Link href="/gdpr" className="text-primary hover:underline">Zásady ochrany osobních údajů (GDPR)</Link>.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">9. Závěrečná ustanovení</h2><p>Podmínky mohou být průběžně aktualizovány. Pro konkrétní zakázku jsou rozhodující také individuálně odsouhlasené podmínky nabídky nebo smlouvy.</p></section>
        </div>
      </div>
    </section>
  );
}
