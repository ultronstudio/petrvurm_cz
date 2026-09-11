"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "./Navbar";

export default function MobileMenu({
  mobileMenuOpened,
  setMobileMenuOpened,
  links,
}: {
  mobileMenuOpened: boolean;
  setMobileMenuOpened: (value: boolean) => void;
  links: NavLink[];
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpened(false);
    };
    if (mobileMenuOpened) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpened, setMobileMenuOpened]);

  useEffect(() => {
    if (!mobileMenuOpened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpened]);

  return (
    <AnimatePresence>
      {mobileMenuOpened && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-black/70" onClick={() => setMobileMenuOpened(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.nav
            id="mobile-menu"
            aria-label="Mobilní menu"
            role="dialog"
            aria-modal="true"
            className="fixed right-0 top-0 z-[70] h-full w-[86%] max-w-[380px] overflow-y-auto border-l border-white/10 bg-[#0b0c0e] p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={() => setMobileMenuOpened(false)} className="rounded-md px-2 py-1 text-sm text-white/70 hover:text-white" aria-label="Zavřít menu">Zavřít</button>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="block py-4 text-lg font-medium text-white/90" onClick={() => setMobileMenuOpened(false)}>{link.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/kontakt" prefetch={false} className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black" onClick={() => setMobileMenuOpened(false)}>Kontakt</Link>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
