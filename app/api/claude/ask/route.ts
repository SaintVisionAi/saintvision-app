export const dynamic = 'force-dynamic';
import Anthropic from 'anthropic';

export async function POST(req: Request) {
  try {
    const { prompt = '', model } = await req.json();
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY missing');

    const m =
      model ||
      process.env.ANTHROPIC_CLAUDE_MODEL ||
      'claude-3-5-sonnet-20240620'; // change if you’ve confirmed opus-4-1

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const msg = await client.messages.create({
      model: m,
      max_tokens: 1024,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    });

    const first = msg.content?.[0];
    const text =
      first && (first as any).type === 'text'
        ? (first as any).text
        : JSON.stringify(msg.content);

    return Response.json({ ok: true, model: m, text, raw: msg });
  } catch (e: any) {
    return new Response(e?.message || 'Claude error', { status: 500 });
  }
}
