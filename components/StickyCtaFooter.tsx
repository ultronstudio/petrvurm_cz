"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";

export default function StickyCtaFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Zobraz CTA po scrollu více než 30% stránky
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrolled(scrollPercent > 30);
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && scrolled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0b0c0e]/95 backdrop-blur-md"
        >
          <div className="container mx-auto max-w-6xl px-4 md:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Připravený na změnu?</p>
                <p className="text-xs text-white/70">Začněme s konzultací bez závazku.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-primary/90 whitespace-nowrap"
                  prefetch={false}
                >
                  <MessageCircle className="h-4 w-4" />
                  Kontakt
                </Link>
                <button
                  onClick={() => setIsVisible(false)}
                  className="rounded-lg p-2 hover:bg-white/10 transition"
                  aria-label="Zavřít"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
