import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O mně',
  description: 'Petr Vurm, webový vývojář. Webům a programování se věnuji od roku 2017.',
  alternates: { canonical: '/o-mne' },
  openGraph: {
    title: 'O mně – Petr Vurm',
    description: 'Webům a programování se věnuji od roku 2017.',
    url: '/o-mne',
    type: 'profile',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
