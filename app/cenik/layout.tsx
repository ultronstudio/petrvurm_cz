import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ceník',
  description: 'Orientační ceny webových stránek, e-shopů a webových aplikací. Hodinová sazba 800 Kč.',
  alternates: { canonical: '/cenik' },
  openGraph: {
    title: 'Ceník – Petr Vurm',
    description: 'Orientační ceny webových stránek, e-shopů a webových aplikací.',
    url: '/cenik',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
