"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  { name: "Služby", href: "/#sluzby" },
  { name: "Projekty", href: "/projekty" },
  { name: "Blog", href: "/blog" },
  { name: "Výuka", href: "/vyuka" },
  { name: "O mně", href: "/o-mne" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold text-primary" aria-label="Petr Vurm – úvod">Petr Vurm</Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Hlavní navigace">
          {links.map((link) => <Link key={link.href} href={link.href} className={`text-sm transition-colors ${isActive(link.href) ? "text-primary" : "text-white/75 hover:text-white"}`} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
          <Link href="/kontakt" className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-black transition hover:bg-primary/90">Kontakt</Link>
        </nav>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
