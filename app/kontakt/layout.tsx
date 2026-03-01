import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Petr Vurm",
  description: "Kontaktujte mě na vývoj webů, aplikací a IT služby. Preferuji e-mail nebo telefonát. Odpovídám do 24 hodin.",
  openGraph: {
    title: "Kontakt – Petr Vurm",
    description: "Kontaktujte mě na vývoj webů, aplikací a IT služby. Preferuji e-mail nebo telefonát. Odpovídám do 24 hodin.",
    type: "website"
  }
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
