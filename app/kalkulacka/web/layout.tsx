import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cena webu',
  description: 'Orientační ceny webových stránek a webových aplikací.',
  robots: { index: false, follow: true },
};

export default function WebCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
