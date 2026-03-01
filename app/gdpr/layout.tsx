import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR – Zásady ochrany dat – Petr Vurm",
  description: "Zásady ochrany osobních údajů a GDPR na webu Petra Vurma. Jak se nakládá s vašimi daty.",
  openGraph: {
    title: "GDPR – Zásady ochrany dat – Petr Vurm",
    description: "Zásady ochrany osobních údajů a GDPR na webu Petra Vurma. Jak se nakládá s vašimi daty.",
    type: "website"
  }
};

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
