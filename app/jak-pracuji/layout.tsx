import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jak pracuji – Petr Vurm",
  description: "Můj pracovní proces od prvotní konzultace přes vývoj až po spuštění a dlouhodobou podporu. Transparentní a spolehlivý přístup.",
  openGraph: {
    title: "Jak pracuji – Petr Vurm",
    description: "Můj pracovní proces od prvotní konzultace přes vývoj až po spuštění a dlouhodobou podporu. Transparentní a spolehlivý přístup.",
    type: "website"
  }
};

export default function JakPracujiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
