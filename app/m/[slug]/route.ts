import { NextResponse } from 'next/server';

const merchLinks: Record<string, string> = {
  zkorodujes: 'https://petrvurm.t-shock.eu/cs/tricko-s-potiskem/kdyz-te-pochciju-zkorodujes',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = merchLinks[slug.toLowerCase()];

  if (!target) {
    return NextResponse.json({ error: 'Odkaz nebyl nalezen.' }, { status: 404 });
  }

  return NextResponse.redirect(target, 307);
}
