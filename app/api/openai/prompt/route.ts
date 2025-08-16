import { readJson, json, fail } from '@/lib/http';
import { OPENAI_API_KEY, OPENAI_PROJECT_ID, PMPT_DEFAULT_ID } from '@/lib/env';

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) return fail('OPENAI_API_KEY missing', 500);
  const { promptId = PMPT_DEFAULT_ID, version = '5', vars } = await readJson(req) as any;

  const headers: Record<string,string> = {
    'authorization': `Bearer ${OPENAI_API_KEY}`,
    'content-type': 'application/json',
  };
  if (OPENAI_PROJECT_ID) headers['OpenAI-Project'] = OPENAI_PROJECT_ID;

  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers,
    body: JSON.stringify({ prompt: { id: promptId, version }, ...(vars ? { input: vars } : {}) }),
  });
  const data = await r.json();
  return json({
    ok: true,
    text: data.output_text ?? '',
    raw: data,
  });
}
