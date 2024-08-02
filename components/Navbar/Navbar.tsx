"use client";

import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "@/Icons/Icons";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export interface NavLink {
  name: string;
  href: string;
}

const links: NavLink[] = [
  {
    name: "O mně",
    href: "/o-mne",
  },
  {
    name: "Projekty",
    href: "/projekty",
  },
  {
    name: "Kontakt",
    href: "/kontakt",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <MobileMenu
        mobileMenuOpened={mobileOpen}
        setMobileMenuOpened={setMobileOpen}
        links={links}
      />
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold" prefetch={false}>
          Petr Vurm
        </Link>
        <nav className="hidden space-x-4 md:flex">
          {links.map((e, i) => (
            <Link
              key={i}
              href={e.href}
              className="transition-colors duration-200 hover:text-primary"
              prefetch={false}
            >
              {e.name}
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="3"
          className="md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((previous) => !previous)}
        >
          <MenuIcon className="h-6 w-6" color="white" />
        </Button>
      </div>
    </header>
  );
}
