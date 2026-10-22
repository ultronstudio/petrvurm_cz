import { NextResponse } from 'next/server';

const TSHOCK_BASE = 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/';

const products = [
  {
    target: 'kdyz-te-pochciju-zkorodujes-tricko-cerna',
    aliases: ['zkorodujes', '2WOwqCFT'],
  },
  {
    target: 'pozor-ajtak-tricko-cerna',
    aliases: ['pozor-ajtak', 'XeegfXG2'],
  },
  {
    target: 'bacha-jede-turek-tricko-cerna',
    aliases: ['bacha-jede-turek', 'utSzu5bJ'],
  },
  {
    target: 'rest-in-peace-tricko-cerna',
    aliases: ['rip', 'rest', 'BrorML4V'],
  },
  {
    target: 'mam-paletu-problemu-tricko-cerna',
    aliases: ['mam-paletu-problemu', '5tMFtxnC'],
  },
  {
    target: 'mam-pole-pusobnosti-tricko-cerna',
    aliases: ['mam-pole-pusobnosti', 'KHfZYZn2'],
  },
  {
    target: 'kdo-nepije-ridi-domu-tricko-cerna',
    aliases: ['kdo-nepije-ridi-domu', 'PqEG2qpy'],
  },
  {
    target: 'je-to-rebel-tricko-cerna',
    aliases: ['je-to-rebel', 'KuE82pak'],
  },
  {
    // světlý potisk = černé tričko
    target: 'jsem-buzna-a-jsem-na-to-hrdej-tricko-cerna',
    aliases: ['jsem-buzna', 'jsem-buzna-svetly', 'deuTeZSx'],
  },
  {
    // tmavý potisk = bílé tričko
    target: 'jsem-buzna-a-jsem-na-to-hrdej-tricko-bile',
    aliases: ['jsem-buzna-tmavy', 'bJmFmywq'],
  },
] as const;

const merchLinks = new Map<string, string>(
  products.flatMap(({ target, aliases }) =>
    aliases.map(alias => [
      alias.toLowerCase(),
      `${TSHOCK_BASE}${target}`,
    ] as const),
  ),
);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = merchLinks.get(slug.toLowerCase());

  if (!target) {
    return NextResponse.json(
      { error: 'Odkaz nebyl nalezen.' },
      { status: 404 },
    );
  }

  return NextResponse.redirect(target, 307);
}
