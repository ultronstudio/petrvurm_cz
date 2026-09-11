"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "@/Icons/Icons";
import MobileMenu from "./MobileMenu";

export interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  { name: "Služby", href: "/#sluzby" },
  { name: "Projekty", href: "/projekty" },
  { name: "Výuka", href: "/vyuka" },
  { name: "Jak pracuji", href: "/jak-pracuji" },
  { name: "Ceník", href: "/cenik" },
  { name: "O mně", href: "/o-mne" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const route = href.split('#')[0] || '/';
    return route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <header className={`fixed top-0 z-50 w-full border-b transition-colors ${scrolled ? "border-white/10 bg-[#0b0c0e]/95" : "border-transparent bg-transparent"}`}>
      <MobileMenu mobileMenuOpened={mobileOpen} setMobileMenuOpened={setMobileOpen} links={links} />
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold text-primary" aria-label="Petr Vurm – úvod">Petr Vurm</Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Hlavní navigace">
          {links.map((link) => <Link key={link.href} href={link.href} className={`text-sm transition-colors ${isActive(link.href) ? "text-primary" : "text-white/75 hover:text-white"}`} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
          <Link href="/kontakt" className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-black transition hover:bg-primary/90">Kontakt</Link>
        </nav>
        <Button ref={btnRef} variant="ghost" size="3" className="md:hidden hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary" aria-label={mobileOpen ? "Zavřít hlavní menu" : "Otevřít hlavní menu"} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen((open) => !open)}>
          <span className={`transition-transform duration-200 ${mobileOpen ? "rotate-90" : ""}`}><MenuIcon className="h-6 w-6" color={mobileOpen ? "#00b7ef" : "white"} /></span>
        </Button>
      </div>
    </header>
  );
}
