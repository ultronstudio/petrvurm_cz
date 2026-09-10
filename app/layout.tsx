import type { Metadata } from 'next';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { SITE_URL } from '@/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Petr Vurm – tvorba webů a webových aplikací',
    template: '%s | Petr Vurm',
  },
  description: 'Navrhuji a vyvíjím firemní weby, webové aplikace a software na míru pro firmy, živnostníky a startupy.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE_URL,
    siteName: 'Petr Vurm',
    title: 'Petr Vurm – tvorba webů a webových aplikací',
    description: 'Firemní weby, webové aplikace a software na míru s důrazem na udržitelnost, bezpečnost a další rozvoj.',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Petr Vurm',
  url: SITE_URL,
  jobTitle: 'Webový a softwarový vývojář',
  email: 'mailto:kontakt@petrvurm.cz',
  knowsAbout: ['Web development', 'Web applications', 'Software development', 'API integrations'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="bg-[#111113] p-[0.01px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Theme appearance="dark" accentColor="indigo" grayColor="slate" hasBackground panelBackground="translucent" radius="small" scaling="100%">
          <Navbar />
          <div className="mt-[64px] flex min-h-screen flex-col bg-background text-foreground">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
