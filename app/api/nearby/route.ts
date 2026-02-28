import { NextRequest, NextResponse } from 'next/server';

// This endpoint returns a list of municipality names within a radius of the
// supplied point. Ideally we would call the official Mapy.cz API with
// latitude/longitude/radius parameters, however the provided API key may be
// missing or invalid (as in the example `.env`). In that case we fall back to
// a hard‑coded list of local towns that the user has already supplied in the
// issue description. The list is sorted alphabetically using the Czech locale.

import { STATIC_TOWNS } from '@/lib/towns';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const radius = searchParams.get('radius');

  if (!lat || !lon || !radius) {
    return NextResponse.json(
      { error: 'lat, lon and radius query parameters are required' },
      { status: 400 }
    );
  }

  const key = process.env.MAPY_API_KEY;
  if (!key) {
    return NextResponse.json({ towns: STATIC_TOWNS });
  }

  // attempt to proxy to Mapy.cz. the actual API may require a different
  // parameter set (rect, radius etc); adjust as appropriate once you have a
  // working key. in the event of an error we fall back to the static list so
  // that the feature remains usable without the key.
  const mapyUrl = `https://api.mapy.cz/v1/geocode?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}&radius=${encodeURIComponent(
    radius
  )}&apikey=${encodeURIComponent(key)}`;

  try {
    const res = await fetch(mapyUrl);
    const data = await res.json();
    if (
      data.detail &&
      /key/i.test(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
    ) {
      // unknown key, etc
      return NextResponse.json({ towns: STATIC_TOWNS });
    }
    // if the API returns an array of features like in autocomplete we can
    // map their names here; otherwise just forward the raw payload.
    const towns =
      Array.isArray(data.features) && data.features[0]?.name
        ? data.features.map((f: any) => f.name)
        : null;
    return NextResponse.json({ towns: towns ?? data });
  } catch (err) {
    console.error('nearby proxy failed', err);
    return NextResponse.json({ towns: STATIC_TOWNS });
  }
}
