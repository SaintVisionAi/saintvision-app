export const dynamic = 'force-dynamic';

const GHL_BASE = process.env.NEXT_PUBLIC_GHL_BASE_URL || 'https://rest.gohighlevel.com/v1/';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, source, notes, tags } = body || {};
    if (!name || !email) return new Response('name and email are required', { status: 400 });

    const token =
      process.env.GHL_LOCATION_API_KEY ||
      process.env.GHL_LOCATION_KEY ||
      process.env.GHL_API_KEY;
    if (!token) throw new Error('GHL token missing (GHL_LOCATION_API_KEY or GHL_API_KEY)');

    // HL wants separate first/last optionally
    const [firstName, ...lastRest] = String(name).trim().split(' ');
    const lastName = lastRest.join(' ');

    const resp = await fetch(new URL('contacts/', GHL_BASE).toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        firstName,
        lastName,
        name,
        source,
        tags,
        customField: {}, // safe placeholder
        notes,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return Response.json({ ok: false, error: data }, { status: resp.status });
    }
    return Response.json({ ok: true, data });
  } catch (e: any) {
    return new Response(e?.message || 'CRM error', { status: 500 });
  }
}
