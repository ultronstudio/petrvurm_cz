import type { Metadata } from 'next';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { SITE_URL } from '@/site.config';
import { personJsonLd, serializeJsonLd, websiteJsonLd } from '@/lib/seo';

const title = 'Petr Vurm – tvorba webů a webových aplikací';
const description = 'Petr Vurm – webový vývojář. Tvorba webových stránek, webových aplikací a softwaru na míru.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Petr Vurm',
  title: {
    default: title,
    template: '%s | Petr Vurm',
  },
  description,
  authors: [{ name: 'Petr Vurm', url: '/o-mne' }],
  creator: 'Petr Vurm',
  publisher: 'Petr Vurm',
  alternates: {
    types: {
      'text/plain': '/llms.txt',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE_URL,
    siteName: 'Petr Vurm',
    title,
    description: 'Webové stránky, webové aplikace a software na míru.',
  },
  twitter: {
    card: 'summary',
    title,
    description: 'Webové stránky, webové aplikace a software na míru.',
  },
};

const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [personJsonLd, websiteJsonLd],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="bg-[#111113] p-[0.01px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(globalJsonLd) }} />
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
