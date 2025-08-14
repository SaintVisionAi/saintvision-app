import { NextRequest } from 'next/server';
import { openai } from '@/lib/openai';
import {
  SAINTSAL_PROMPT_ID,
  SAINTSAL_PROMPT_VERSION,
  SAINTSAL_SYSTEM,
} from '@/lib/config/saintsalPrompt';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const input = typeof body?.input === 'string' ? body.input : '';

  // Build payload WITHOUT a model override — use the prompt’s saved config.
  const payload: any = {
    prompt: { id: SAINTSAL_PROMPT_ID, version: SAINTSAL_PROMPT_VERSION },
    input,
    metadata: { system_hint: SAINTSAL_SYSTEM.slice(0, 160) },
  };

  try {
    const resp = await openai.responses.create(payload);
    const text = (resp as any).output_text ?? '';
    return Response.json({ ok: true, id: resp.id, text });
  } catch (err: any) {
    const msg = err?.message || '';
    // Defensive retry (same payload) just in case the SDK mutates; otherwise return JSON error.
    if (/reasoning\.effort/i.test(msg) || /Unsupported parameter/i.test(msg)) {
      try {
        const resp = await openai.responses.create(payload);
        const text = (resp as any).output_text ?? '';
        return Response.json({ ok: true, id: resp.id, text, note: 'fallback_no_model' });
      } catch (e2: any) {
        return Response.json({ ok: false, error: e2?.message || 'Prompt run error (fallback)' }, { status: 500 });
      }
    }
    return Response.json({ ok: false, error: msg || 'Prompt run error' }, { status: 500 });
  }
}
