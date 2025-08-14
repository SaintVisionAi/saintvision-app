import { readJson, json, fail } from '@/lib/http';
import { UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN } from '@/lib/env';

export async function POST(req: Request) {
  const { query, k = 5 } = await readJson<{ query?: string; k?: number }>(req);
  if (!query) return fail('query required');
  if (!UPSTASH_VECTOR_REST_URL || !UPSTASH_VECTOR_REST_TOKEN) {
    return fail('Upstash Vector not configured', 501);
  }

  const r = await fetch(`${UPSTASH_VECTOR_REST_URL}/query`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${UPSTASH_VECTOR_REST_TOKEN}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ topK: Math.max(1, Math.min(10, k)), data: query })
  });

  const data = await r.json();
  return json({ ok: true, results: data?.result ?? data });
}
