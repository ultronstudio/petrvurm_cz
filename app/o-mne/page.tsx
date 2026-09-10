import Image from 'next/image';
import Link from 'next/link';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

export default function OMne() {
  return (
    <section className="relative py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(0,183,239,0.18),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <header className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">O mně</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Petr Vurm</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">Jsem full-stack vývojář zaměřený na webové aplikace a software na míru. Webům a programování se věnuji od roku 2017. Při práci řeším nejen vzhled, ale také strukturu kódu, bezpečnost, výkon a možnost dalšího rozvoje.</p>
          </div>
          <Image src="/images/me/cro_interview.webp" alt="Petr Vurm" width={360} height={480} className="mx-auto aspect-[3/4] w-full max-w-[360px] rounded-3xl border border-white/10 object-cover" priority sizes="360px" />
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-7"><Briefcase className="h-6 w-6 text-primary" aria-hidden="true" /><h2 className="mt-4 text-2xl font-bold">Jak jsem začal</h2><p className="mt-3 leading-7 text-white/75">S tvorbou webů jsem začal v roce 2017 v kroužku tvorby webových stránek a později pokračoval samostatně. Postupně jsem se od HTML a CSS dostal k JavaScriptu, backendu, databázím a vývoji celých aplikací.</p></section>
          <section className="rounded-2xl border border-white/10 bg-white/5 p-7"><GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" /><h2 className="mt-4 text-2xl font-bold">Zaměření</h2><p className="mt-3 leading-7 text-white/75">Nejvíc mě zajímá vývoj řešení, která mají vlastní logiku: firemní aplikace, integrace, interní nástroje a weby, které se budou dlouhodobě rozvíjet.</p></section>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-7" aria-labelledby="vzdelani-certifikaty">
          <h2 id="vzdelani-certifikaty" className="flex items-center gap-2 text-2xl font-bold"><Award className="h-6 w-6 text-primary" aria-hidden="true" /> Vzdělání a doložitelné certifikáty</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div><h3 className="font-bold">Studium</h3><ul className="mt-3 space-y-3 text-sm text-white/75"><li><strong className="text-white">SPŠE a VOŠ Pardubice</strong><br />2026–2027 · Informační technologie – vývoj aplikací</li><li><strong className="text-white">SPŠ, SOŠ a SOU Hradec Králové</strong><br />2021–2026 · Informační technologie</li></ul></div>
            <div><h3 className="font-bold">Certifikáty</h3><ul className="mt-3 space-y-3 text-sm"><li><Link href="/docs/certificates/cisco/network-technician-career-path.pdf" target="_blank" className="text-primary hover:underline">Cisco Networking Academy – Network Technician Career Path</Link></li><li><Link href="/docs/certificates/cisco/javascript-essentials-1.pdf" target="_blank" className="text-primary hover:underline">Cisco Networking Academy – JavaScript Essentials 1</Link></li><li><Link href="/docs/certificates/dofe/bronze.pdf" target="_blank" className="text-primary hover:underline">DofE – bronzová úroveň</Link></li></ul></div>
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-7 text-center"><h2 className="text-2xl font-bold">Hledáte vývojáře pro konkrétní projekt?</h2><p className="mx-auto mt-3 max-w-xl text-white/70">Popište mi, co má řešení vyřešit a v jakém je stavu.</p><Link href="/kontakt" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-black hover:bg-primary/90">Probrat projekt</Link></div>
      </div>
    </section>
  );
}
