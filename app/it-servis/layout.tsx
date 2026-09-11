import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lokální IT servis',
  description: 'Pomoc s domácí Wi-Fi, Mesh sítí, tiskárnami a chytrými TV v okolí Nechanic.',
  alternates: { canonical: '/it-servis' },
  openGraph: {
    title: 'Lokální IT servis – Petr Vurm',
    description: 'Pomoc s domácí sítí a běžným nastavením zařízení v okolí Nechanic.',
    url: '/it-servis',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
