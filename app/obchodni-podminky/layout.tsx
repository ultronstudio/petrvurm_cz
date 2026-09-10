import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Obchodní podmínky', description: 'Obchodní podmínky pro poskytování vývoje webů, softwaru a souvisejících IT služeb.', alternates: { canonical: '/obchodni-podminky' } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
