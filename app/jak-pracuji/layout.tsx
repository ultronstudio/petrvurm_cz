import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak probíhá spolupráce',
  description: 'Proces od úvodní konzultace a zadání přes návrh, implementaci a testování až po nasazení, předání a další rozvoj.',
  alternates: { canonical: '/jak-pracuji' },
  openGraph: { title: 'Jak pracuji – Petr Vurm', description: 'Přehledný proces spolupráce na webu nebo softwaru bez nereálných garancí.', url: '/jak-pracuji', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
