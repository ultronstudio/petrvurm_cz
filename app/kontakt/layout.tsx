import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt a poptávka projektu',
  description: 'Kontakt pro poptávku firemního webu, webové aplikace, integrace nebo zakázkového softwaru.',
  alternates: { canonical: '/kontakt' },
  openGraph: { title: 'Kontakt – Petr Vurm', description: 'Proberme cíl, rozsah a další postup vašeho webu nebo aplikace.', url: '/kontakt', type: 'website' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
