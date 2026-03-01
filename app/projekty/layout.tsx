import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekty – Petr Vurm",
  description: "Přehled mých realizovaných projektů: webové aplikace, sociální sítě, desktopové aplikace a open-source projekty.",
  openGraph: {
    title: "Projekty – Petr Vurm",
    description: "Přehled mých realizovaných projektů: webové aplikace, sociální sítě, desktopové aplikace a open-source projekty.",
    type: "website"
  }
};

export default function ProjektyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
