"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "./Navbar";

export default function MobileMenu({
  mobileMenuOpened,
  setMobileMenuOpened,
  links,
}: {
  mobileMenuOpened: boolean;
  setMobileMenuOpened: (value: boolean) => any;
  links: NavLink[];
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpened(false);
    };
    if (mobileMenuOpened) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpened, setMobileMenuOpened]);

  // BODY SCROLL LOCK + optional focus trap start
  useEffect(() => {
    if (mobileMenuOpened) {
      const { style } = document.body;
      const prev = style.overflow;
      style.overflow = "hidden"; // lock page scroll
      return () => {
        style.overflow = prev;
      };
    }
  }, [mobileMenuOpened]);

  return (
    <AnimatePresence>
      {mobileMenuOpened && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpened(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Slide-over panel */}
          <motion.nav
            id="mobile-menu"
            aria-label="Mobilní menu"
            role="dialog"
            aria-modal="true"
            ref={panelRef}
            className="
              fixed right-0 top-0 z-[70] h-full w-[86%] max-w-[420px]
              border-l border-white/10 bg-[#0b0c0e]/95 backdrop-blur
              p-6 overflow-y-auto overscroll-contain
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="sticky top-0 z-10 mb-4 flex items-center justify-between bg-transparent/0">
              <button
                onClick={() => setMobileMenuOpened(false)}
                className="rounded-md px-2 py-1 text-sm text-white/70 ring-1 ring-white/20 hover:bg-white/10"
                aria-label="Zavřít menu"
              >
                Zavřít
              </button>
            </div>

            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={l.href}
                    prefetch={false}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-white/90 ring-1 ring-transparent transition hover:bg-white/10 hover:text-white"
                    onClick={() => setMobileMenuOpened(false)}
                  >
                    {l.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/kontakt"
                prefetch={false}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/90"
                onClick={() => setMobileMenuOpened(false)}
              >
                Nezávazná konzultace
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-white/50">
              © {new Date().getFullYear()} Petr Vurm
            </p>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
