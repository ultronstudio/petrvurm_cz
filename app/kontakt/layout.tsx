import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontakt na Petra Vurma pro webové stránky, aplikace a software na míru.',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    title: 'Kontakt – Petr Vurm',
    description: 'Kontakt na Petra Vurma pro webové stránky, aplikace a software na míru.',
    url: '/kontakt',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
