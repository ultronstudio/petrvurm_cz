import { NextRequest, NextResponse } from 'next/server';

// proxies requests to the Mapy.cz geocoding/autocomplete service. you must
// obtain an API key from https://mapy.cz/developers and set it in
// MAPY_API_KEY in your environment (e.g. .env.local) so that it isn't
// exposed on the client.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  // debug: print the key length so we can confirm it's being read correctly
  console.debug('MAPY_API_KEY length =', process.env.MAPY_API_KEY?.length);
  if (!q) {
    return NextResponse.json({ features: [] });
  }

  const key = process.env.MAPY_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'missing API key' }, { status: 500 });
  }

  // Mapy.cz geocoding endpoint accepts a `query` parameter and an `apikey`.
  // the exact shape of the response can change; here we simply forward it.

  const mapyUrl = `https://api.mapy.cz/v1/geocode?query=${encodeURIComponent(
    q
  )}&apikey=${encodeURIComponent(key)}`;

  // Some Mapy.com API keys are restricted to a referer/origin. Forward a
  // sensible Referer/Origin header (configurable via MAPY_REFERER) so the
  // provided key is accepted when the project requires a referer match.
  const referer = process.env.MAPY_REFERER || 'https://petrvurm.cz';

  try {
    const res = await fetch(mapyUrl, {
      headers: {
        Referer: referer,
        Origin: referer,
      },
    });
    const data = await res.json();
    // if the key is wrong the API returns a detail message; fall back to an
    // empty array rather than forwarding the error to the client.
    if (data.detail && /key/i.test(data.detail)) {
      return NextResponse.json({ features: [] });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error('autocomplete proxy failed', err);
    return NextResponse.json({ features: [] });
  }
}
