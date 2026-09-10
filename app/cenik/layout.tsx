import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ceník webů a vývoje',
  description: 'Orientační ceny firemních webů, webů s CMS, e-shopů a webových aplikací. Zakázkový vývoj od 800 Kč za hodinu.',
  alternates: { canonical: '/cenik' },
  openGraph: { title: 'Ceník webů a vývoje – Petr Vurm', description: 'Startovní ceny webů a webových aplikací a přehled toho, co cenu projektu ovlivňuje.', url: '/cenik', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
