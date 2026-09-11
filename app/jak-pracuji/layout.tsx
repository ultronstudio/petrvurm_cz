import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak pracuji',
  description: 'Jak probíhá práce na webu nebo aplikaci od zadání po nasazení a předání.',
  alternates: { canonical: '/jak-pracuji' },
  openGraph: {
    title: 'Jak pracuji – Petr Vurm',
    description: 'Jak probíhá práce na webu nebo aplikaci od zadání po nasazení a předání.',
    url: '/jak-pracuji',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
