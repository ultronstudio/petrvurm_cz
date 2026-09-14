import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();

  if (host === 'wifi.petrvurm.cz' && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/wifi.html';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
