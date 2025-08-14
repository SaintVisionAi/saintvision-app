import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || !String(prompt).trim()) {
      return new Response("Missing 'prompt'", { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY!;
    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
    const project = process.env.OPENAI_PROJECT_ID || '';

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        ...(project ? { 'OpenAI-Project': project } : {}),
      },
      body: JSON.stringify({
        model,
        input: prompt
      }),
    });
    const j = await r.json();

    const text = j?.output_text
      || j?.choices?.[0]?.message?.content
      || (typeof j === 'string' ? j : JSON.stringify(j));

    return Response.json({ ok: true, model, text });
  } catch (e: any) {
    return new Response(e?.message || 'openai agent error', { status: 500 });
  }
}
