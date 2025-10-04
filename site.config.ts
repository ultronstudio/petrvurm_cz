export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://petrvurm.cz";

export const STATIC_ROUTES: string[] = [
  "/",
  "/o-mne",
  "/cenik",
  "/kontakt",
  "/projekty",
  "/gdpr",
  "/obchodni-podminky",
  "/kalkulacka/web",
  "/kalkulacka/uceni",
];
