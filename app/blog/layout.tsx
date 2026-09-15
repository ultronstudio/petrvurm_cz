import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Články Petra Vurma o webovém vývoji, programování a technologiích.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog – Petr Vurm',
    description: 'Články Petra Vurma o webovém vývoji, programování a technologiích.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
