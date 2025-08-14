export const dynamic = 'force-dynamic';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { prompt = '', model } = await req.json();
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY missing');

    const m =
      model ||
      process.env.OPENAI_MODEL ||
      'gpt-4.1-mini'; // safe default if you haven’t flipped to GPT-5 yet

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      organization: process.env.OPENAI_ORGANIZATION,
      project: process.env.OPENAI_PROJECT_ID,
    });

    const res = await client.responses.create({ model: m, input: prompt });
    const text = (res as any).output_text ?? '';

    return Response.json({ ok: true, model: m, text, raw: res });
  } catch (e: any) {
    return new Response(e?.message || 'OpenAI error', { status: 500 });
  }
}
