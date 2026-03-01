import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky – Petr Vurm",
  description: "Obchodní podmínky poskytování služeb na webu petrvurm.cz. Práva a povinnosti klienta.",
  openGraph: {
    title: "Obchodní podmínky – Petr Vurm",
    description: "Obchodní podmínky poskytování služeb na webu petrvurm.cz. Práva a povinnosti klienta.",
    type: "website"
  }
};

export default function ObchodniPodminkyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
