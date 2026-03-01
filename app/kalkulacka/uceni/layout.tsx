import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulačka kurzů – Petr Vurm",
  description: "Interaktivní kalkulačka ceny kurzů, školení a doučování. Vyberte si typ a počet lekcí, ihned vidíte cenu.",
  openGraph: {
    title: "Kalkulačka kurzů – Petr Vurm",
    description: "Interaktivní kalkulačka ceny kurzů, školení a doučování. Vyberte si typ a počet lekcí, ihned vidíte cenu.",
    type: "website"
  }
};

export default function UceniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
