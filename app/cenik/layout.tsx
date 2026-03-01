import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ceník & Služby – Petr Vurm",
  description: "Přehled všech služeb a cen. Web, IT služby, školení a poradenství. Transparentní cenování bez skrytých nákladů.",
  openGraph: {
    title: "Ceník & Služby – Petr Vurm",
    description: "Přehled všech služeb a cen. Web, IT služby, školení a poradenství. Transparentní cenování bez skrytých nákladů.",
    type: "website"
  }
};

export default function CenikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
