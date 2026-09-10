import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Zásady ochrany osobních údajů', description: 'Informace o zpracování osobních údajů na webu petrvurm.cz.', alternates: { canonical: '/gdpr' } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
