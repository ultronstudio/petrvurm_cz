import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Školení a konzultace IT',
  description: 'Individuální výuka programování a IT konzultace jako doplňková služba.',
  robots: { index: false, follow: true },
};

export default function UceniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
