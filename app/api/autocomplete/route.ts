import { NextRequest, NextResponse } from 'next/server';

type MapyResponse = {
  detail?: string;
  items?: unknown[];
  features?: unknown[];
  [key: string]: unknown;
};

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams.get('q')?.trim().slice(0, 160) ?? '';

  if (!query) {
    return NextResponse.json({ features: [] });
  }

  const key = process.env.MAPY_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Map service is not configured.' }, { status: 503 });
  }

  const mapyUrl = new URL('https://api.mapy.cz/v1/geocode');
  mapyUrl.searchParams.set('query', query);
  mapyUrl.searchParams.set('apikey', key);

  // Some Mapy.cz keys are origin-restricted, so keep the server-side proxy origin configurable.
  const referer = process.env.MAPY_REFERER || process.env.NEXT_PUBLIC_SITE_URL || 'https://petrvurm.cz';

  try {
    const response = await fetch(mapyUrl, {
      headers: {
        Referer: referer,
        Origin: referer,
      },
    });

    const data = (await response.json()) as MapyResponse;

    if (!response.ok || (data.detail && /key/i.test(data.detail))) {
      return NextResponse.json({ features: [] });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ features: [] });
  }
}
