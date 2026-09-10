import Link from 'next/link';

export default function GDPR() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-4xl px-4 text-[17px] leading-relaxed md:px-6">
        <h1 className="mb-8 text-4xl font-bold">Zásady ochrany osobních údajů (GDPR)</h1>
        <p className="mb-12 text-sm text-white/60">Poslední aktualizace: 4. 10. 2025</p>
        <div className="space-y-10 text-white/90">
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">1. Správce osobních údajů</h2><p>Správcem osobních údajů je <strong>Petr Vurm</strong>, IČ: 21180164, se sídlem Nechanice, Česká republika.<br />Kontakt: <a href="mailto:kontakt@petrvurm.cz" className="text-primary hover:underline">kontakt@petrvurm.cz</a>.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">2. Jaké údaje zpracovávám</h2><ul className="list-disc space-y-1 pl-6"><li>Jméno, příjmení a kontaktní údaje (e-mail, telefon).</li><li>Fakturační údaje pro účely účetnictví.</li><li>Technické údaje z webu (IP adresa, cookies, analytické údaje).</li><li>Informace poskytnuté při komunikaci se zákazníkem.</li></ul></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">3. Účel zpracování</h2><ul className="list-disc space-y-1 pl-6"><li>Plnění smlouvy a poskytování služeb.</li><li>Komunikace se zákazníkem a vyřízení dotazů.</li><li>Plnění zákonných povinností.</li><li>Marketingová komunikace se souhlasem subjektu údajů.</li></ul></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">4. Doba uchování údajů</h2><p>Osobní údaje jsou uchovávány pouze po nezbytně nutnou dobu podle účelu zpracování a příslušných povinností.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">5. Předávání třetím stranám</h2><p>Osobní údaje mohou být předány poskytovatelům technické infrastruktury a dalším zpracovatelům v rozsahu nezbytném pro provoz služeb a plnění zákonných povinností.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">6. Práva subjektů údajů</h2><p>V rozsahu stanoveném právními předpisy můžete požadovat přístup, opravu nebo výmaz údajů, omezení zpracování, vznést námitku, využít právo na přenositelnost a obrátit se na Úřad pro ochranu osobních údajů.</p></section>
          <section className="space-y-3"><h2 className="text-2xl font-semibold text-primary">7. Závěrečná ustanovení</h2><p>Tyto zásady mohou být průběžně aktualizovány. Dotazy k ochraně osobních údajů můžete poslat na kontaktní e-mail uvedený výše.</p><p><Link href="/kontakt" className="text-primary hover:underline">Kontaktní stránka</Link></p></section>
        </div>
      </div>
    </section>
  );
}
