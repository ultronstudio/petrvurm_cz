import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme, Container, Section } from "@radix-ui/themes";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// i18n
import { useTranslation } from 'next-i18next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petr Vurm",
  description:
    "Tvořím internetové stránky na míru, poskytuji kompletní webový servis, vytvářím desktopové aplikace pro jednotlivce a firmy, pořádám kurzy a workshopy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " p-[0.01px] bg-[#111113]"}>
        <Theme
          appearance="dark"
          accentColor="indigo"
          grayColor="slate"
          hasBackground={true}
          panelBackground="translucent"
          radius="small"
          scaling="100%"
        >
          <Navbar />
          <div className="mt-[64px] flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
