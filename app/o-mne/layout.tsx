import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O mně',
  description: 'Petr Vurm, full-stack vývojář. Webům a programování se věnuji od roku 2017 a zaměřuji se na webové aplikace a software na míru.',
  alternates: { canonical: '/o-mne' },
  openGraph: { title: 'O mně – Petr Vurm', description: 'Full-stack vývojář zaměřený na webové aplikace, software a dlouhodobě udržitelná řešení.', url: '/o-mne', type: 'profile' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
