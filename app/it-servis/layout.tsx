import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lokální IT servis',
  description: 'Doplňkový lokální IT servis v okolí Nechanic: domácí Wi-Fi, Mesh, tiskárny, chytré TV a základní technologické konzultace.',
  alternates: { canonical: '/it-servis' },
  openGraph: { title: 'Lokální IT servis – Petr Vurm', description: 'Praktická pomoc s domácí sítí a zařízeními v ručně vybraných obsluhovaných lokalitách.', url: '/it-servis', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
