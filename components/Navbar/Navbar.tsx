"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "@/Icons/Icons";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";

export interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  { name: "O mně", href: "/o-mne" },
  { name: "Projekty", href: "/projekty" },
  { name: "Ceník", href: "/cenik" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // sticky styling on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // return focus to hamburger when mobile menu closes (a11y)
  useEffect(() => {
    if (!mobileOpen) btnRef.current?.focus();
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled
          ? "backdrop-blur bg-[#0b0c0e]/70 shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Hlavní navigace"
    >
      <MobileMenu
        mobileMenuOpened={mobileOpen}
        setMobileMenuOpened={setMobileOpen}
        links={links}
      />

      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-white"
          prefetch={false}
          aria-label="Přejít na úvodní stránku"
        >
          <span className="bg-primary bg-clip-text text-transparent">
            Petr Vurm
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              className={`text-sm transition-colors ${
                isActive(l.href)
                  ? "text-primary"
                  : "text-white/80 hover:text-white"
              }`}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.name}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/kontakt"
            prefetch={false}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
          >
            Nezávazná konzultace
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <Button
          ref={btnRef}
          variant="ghost"
          size="3"
          className="md:hidden hover:bg-white/10 focus:outline-none focus:ring-2"
          aria-label="Otevřít hlavní menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((p) => !p)}
        >
          {/* barevná ikona při otevření */}
          <motion.span
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MenuIcon className="h-6 w-6" color={mobileOpen ? "#00b7ef" : "white"} />
          </motion.span>
        </Button>
      </div>
    </header>
  );
}
