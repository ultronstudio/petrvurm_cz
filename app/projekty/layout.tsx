import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projekty',
  description: 'Výběr webů, aplikací a dalších projektů Petra Vurma.',
  alternates: { canonical: '/projekty' },
  openGraph: {
    title: 'Projekty – Petr Vurm',
    description: 'Výběr webů, aplikací a dalších projektů Petra Vurma.',
    url: '/projekty',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
