import { NextResponse } from 'next/server';

const merchShopUrl = 'https://petrvurm.t-shock.eu/cs/';

export function GET() {
  return NextResponse.redirect(merchShopUrl, 307);
}
