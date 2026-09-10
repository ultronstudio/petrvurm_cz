import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orientační cena webu',
  description: 'Startovní ceny webů a webových aplikací a vysvětlení faktorů, které ovlivňují výslednou cenu projektu.',
  robots: { index: false, follow: true },
};

export default function WebCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
