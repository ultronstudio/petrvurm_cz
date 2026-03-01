import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulačka webů – Petr Vurm",
  description: "Interaktivní kalkulačka ceny vývoje webu. Vyberte si služby a ihned uvidíte orientační cenu s DPH.",
  openGraph: {
    title: "Kalkulačka webů – Petr Vurm",
    description: "Interaktivní kalkulačka ceny vývoje webu. Vyberte si služby a ihned uvidíte orientační cenu s DPH.",
    type: "website"
  }
};

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
