import type { Metadata } from 'next';
import { TEACHING_MIN_PRICE } from '@/lib/teaching';

export const metadata: Metadata = {
  title: 'Výuka, workshopy a přednášky',
  description: `Individuální výuka programování od ${TEACHING_MIN_PRICE} Kč / 60 min, mentoring a workshopy nebo přednášky pro školy, knihovny, firmy a veřejnost.`,
  alternates: { canonical: '/vyuka' },
  openGraph: {
    title: 'Výuka, workshopy a přednášky – Petr Vurm',
    description: 'Praktická výuka programování, mentoring a technické workshopy nebo přednášky pro jednotlivce i skupiny.',
    url: '/vyuka',
    type: 'website',
  },
};

export default function VyukaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
