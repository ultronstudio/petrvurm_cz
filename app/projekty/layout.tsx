import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projekty a případové ukázky',
  description: 'Vybrané webové aplikace, software a vlastní projekty s vysvětlením cíle, řešení a technických dovedností.',
  alternates: { canonical: '/projekty' },
  openGraph: { title: 'Projekty – Petr Vurm', description: 'Ukázky řešení od webových aplikací po browser extensions a zakázkový software.', url: '/projekty', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
