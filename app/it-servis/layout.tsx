import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT služby – Petr Vurm',
  description: 'Čisté IT služby: instalace Wi-Fi, tiskáren, webů a IT konzultace. Bez vrtání do zdí, bez kabelu. Přijedu do 24 hodin.',
  openGraph: {
    title: 'IT služby – Petr Vurm',
    description: 'Čisté IT služby: instalace Wi-Fi, tiskáren, webů a IT konzultace. Bez vrtání do zdí, bez kabelu. Přijedu do 24 hodin.',
    type: 'website'
  }
};

export default function ItServisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
