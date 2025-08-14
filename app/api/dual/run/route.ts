import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { openai } from '@/lib/openai';

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';
const anthropic = ANTHROPIC_KEY ? new Anthropic({ apiKey: ANTHROPIC_KEY }) : null;

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

async function askClaude(prompt: string) {
  if (!anthropic) return { ok: false, text: '', error: 'anthropic_disabled' };
  try {
    const c = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    });
    const text =
      c.content?.[0]?.type === 'text'
        ? (c.content[0] as any).text
        : JSON.stringify(c.content);
    return { ok: true, text };
  } catch (e: any) {
    const msg = e?.message || '';
    if (/credit balance/i.test(msg) || /insufficient/i.test(msg)) {
      return { ok: false, text: '', error: 'anthropic_no_credits' };
    }
    return { ok: false, text: '', error: msg || 'anthropic_error' };
  }
}

async function askOpenAI(prompt: string) {
  const g = await openai.responses.create({
    model: OPENAI_MODEL,
    input: prompt,
  });
  const text = (g as any).output_text ?? '';
  return { ok: true, text };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const prompt = String(body?.prompt || '').trim();
  if (!prompt) {
    return Response.json({ ok: false, error: 'Missing prompt' }, { status: 400 });
  }

  const [cRes, oRes] = await Promise.allSettled([askClaude(prompt), askOpenAI(prompt)]);
  const claude = cRes.status === 'fulfilled' ? cRes.value : { ok: false, text: '', error: cRes.reason?.message || 'anthropic_error' };
  const openai = oRes.status === 'fulfilled' ? oRes.value : { ok: false, text: '', error: oRes.reason?.message || 'openai_error' };

  const unified =
`Claude${claude.ok ? '' : ' (offline)'}:
${claude.ok ? claude.text : (claude.error || 'unavailable')}

OpenAI:
${openai.ok ? openai.text : (openai.error || 'error')}`;

  const degraded = !claude.ok; // means we operated OpenAI-only
  const success = claude.ok || openai.ok;

  // Always return 200 so the UI doesn't break; include status flags in JSON.
  return Response.json({
    ok: success,
    degraded,
    models: { claude: CLAUDE_MODEL, openai: OPENAI_MODEL },
    claude,
    openai,
    unified,
  });
}
