import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mně – Petr Vurm",
  description: "Jsem webový vývojář a tvůrce aplikací se zaměřením na moderní technologie. Věnuji se vývoji webů, desktopových aplikací a poradenství.",
  openGraph: {
    title: "O mně – Petr Vurm",
    description: "Jsem webový vývojář a tvůrce aplikací se zaměřením na moderní technologie. Věnuji se vývoji webů, desktopových aplikací a poradenství.",
    type: "website"
  }
};

export default function OMneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
