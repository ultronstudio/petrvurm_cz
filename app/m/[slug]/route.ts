import { NextResponse } from 'next/server';

const merchLinks: Record<string, string> = {
  'zkorodujes': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/kdyz-te-pochciju-zkorodujes-tricko-cerna',
  'pozor-ajtak': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/pozor-ajtak-tricko-cerna',
  'bacha-jede-turek': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/bacha-jede-turek-tricko-cerna',
  'rip': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/rest-in-peace-tricko-cerna',
  'rest': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/rest-in-peace-tricko-cerna',
  'mam-paletu-problemu': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/mam-paletu-problemu-tricko-cerna',
  'mam-pole-pusobnosti': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/mam-pole-pusobnosti-tricko-cerna',
  'kdo-nepije-ridi-domu': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/kdo-nepije-ridi-domu-tricko-cerna',
  'je-to-rebel': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/je-to-rebel-tricko-cerna',
  'jsem-buzna-svetly': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/jsem-buzna-a-jsem-na-to-hrdej-tricko-cerna',
  'jsem-buzna-tmavy': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/jsem-buzna-a-jsem-na-to-hrdej-tricko-bile',
  'jsem-buzna': 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/jsem-buzna-a-jsem-na-to-hrdej-tricko-cerna',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = merchLinks[slug.toLowerCase()];

  if (!target) {
    return NextResponse.json(
      { error: 'Odkaz nebyl nalezen.' },
      { status: 404 },
    );
  }

  return NextResponse.redirect(target, 307);
}
