import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ceník a kalkulátor',
  description: 'Interaktivní kalkulátor webů, aplikací, správy, integrací a revizí existujících webů. Hodinová sazba 800 Kč.',
  alternates: { canonical: '/cenik' },
  openGraph: {
    title: 'Ceník a kalkulátor – Petr Vurm',
    description: 'Vyberte základ projektu a doplňkové služby a získejte orientační cenu.',
    url: '/cenik',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
