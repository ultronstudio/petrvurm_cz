"use client";

import Link from "next/link";
import {
  GitHubIcon,
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/Icons/Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  const nav = [
    { name: "O mně", href: "/o-mne" },
    { name: "Projekty", href: "/projekty" },
    { name: "Ceník", href: "/cenik" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const legal = [
    { name: "Obchodní podmínky", href: "/obchodni-podminky" },
    { name: "Zásady ochrany osobních údajů", href: "/gdpr" }
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0b0c0e]">
      {/* top */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* brand + claim */}
          <div>
            <Link
              href="/"
              prefetch={false}
              className="text-xl font-extrabold tracking-tight text-white"
              aria-label="Petr Vurm – domů"
            >
              <span className="bg-primary bg-clip-text text-transparent">
                Petr Vurm
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Tvořím moderní webové aplikace a nástroje, které šetří čas,
              snižují náklady a doručují výsledky.
            </p>

            {/* socials */}
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="https://github.com/ultronstudio"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                aria-label="GitHub"
                className="group rounded-md p-2 ring-1 ring-white/10 hover:bg-white/10"
              >
                <GitHubIcon className="h-5 w-5 fill-white group-hover:fill-primary" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/petrvurm/"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                aria-label="LinkedIn"
                className="group rounded-md p-2 ring-1 ring-white/10 hover:bg-white/10"
              >
                <LinkedInIcon className="h-5 w-5 fill-white group-hover:fill-[#0a66c2]" />
              </Link>
              <Link
                href="https://www.facebook.com/vurmpetr"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                aria-label="Facebook"
                className="group rounded-md p-2 ring-1 ring-white/10 hover:bg-white/10"
              >
                <FacebookIcon className="h-5 w-5 fill-white group-hover:fill-[#0866FF]" />
              </Link>
              <Link
                href="https://www.instagram.com/ultronek/"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                aria-label="Instagram"
                className="group rounded-md p-2 ring-1 ring-white/10 hover:bg-white/10"
              >
                {/* jednoduchá brand barva; gradient by vyžadoval upravené SVG */}
                <InstagramIcon className="h-5 w-5 fill-white group-hover:fill-[#E1306C]" />
              </Link>
            </div>
          </div>

          {/* nav columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold text-white">Navigace</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      prefetch={false}
                      className="text-white/80 hover:text-white"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">Právní</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      prefetch={false}
                      className="text-white/80 hover:text-white"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-white">Kontakt</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="mailto:kontakt@petrvurm.cz"
                  >
                    kontakt@petrvurm.cz
                  </a>
                </li>
                <li className="text-white/60">IČ: 21180164</li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>
            &copy; {year} Petr Vurm • Vytvořeno s&nbsp;❤️ k web developmentu
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" prefetch={false} className="hover:text-white">
              Mapa webu
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
