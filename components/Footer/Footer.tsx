import Link from "next/link";
import { GitHubIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from "@/Icons/Icons";

const nav = [
  { name: "O mně", href: "/o-mne" },
  { name: "Projekty", href: "/projekty" },
  { name: "Ceník", href: "/cenik" },
  { name: "Lokální IT servis", href: "/it-servis" },
  { name: "Kontakt", href: "/kontakt" },
];

const legal = [
  { name: "Obchodní podmínky", href: "/obchodni-podminky" },
  { name: "Zásady ochrany osobních údajů", href: "/gdpr" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0c0e]">
      <div className="container mx-auto max-w-6xl px-4 py-9 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Link href="/" className="text-lg font-bold text-primary" aria-label="Petr Vurm – domů">Petr Vurm</Link>
            <p className="mt-2 max-w-sm text-sm text-white/60">Weby, webové aplikace a software na míru.</p>
            <div className="mt-4 flex items-center gap-4">
              <Link href="https://github.com/ultronstudio" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/60 hover:text-primary"><GitHubIcon className="h-5 w-5 fill-current" /></Link>
              <Link href="https://www.linkedin.com/in/petrvurm/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white"><LinkedInIcon className="h-5 w-5 fill-current" /></Link>
              <Link href="https://www.facebook.com/vurmpetr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white"><FacebookIcon className="h-5 w-5 fill-current" /></Link>
              <Link href="https://www.instagram.com/ultronek/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white"><InstagramIcon className="h-5 w-5 fill-current" /></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm sm:grid-cols-3">
            <div>
              <h2 className="font-semibold text-white">Navigace</h2>
              <ul className="mt-3 space-y-2">
                {nav.map((item) => <li key={item.href}><Link href={item.href} className="text-white/60 hover:text-white">{item.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-white">Právní</h2>
              <ul className="mt-3 space-y-2">
                {legal.map((item) => <li key={item.href}><Link href={item.href} className="text-white/60 hover:text-white">{item.name}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-semibold text-white">Kontakt</h2>
              <a className="mt-3 inline-block text-primary hover:underline" href="mailto:kontakt@petrvurm.cz">kontakt@petrvurm.cz</a>
              <p className="mt-2 text-white/50">IČ: 21180164</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Petr Vurm</p>
          <Link href="/sitemap.xml" className="hover:text-white">Mapa webu</Link>
        </div>
      </div>
    </footer>
  );
}
