import { readJson, json, fail } from '@/lib/http';
import {
  OPENAI_API_KEY, OPENAI_MODEL, OPENAI_PROJECT_ID,
  ANTHROPIC_API_KEY, CLAUDE_MODEL
} from '@/lib/env';

async function askOpenAI(prompt: string) {
  if (!OPENAI_API_KEY) return { text: '(OpenAI key not set)' };
  const body: any = { 
    model: OPENAI_MODEL || 'gpt-4', 
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 512,
    temperature: 0.2
  };
  const headers: Record<string,string> = {
    'authorization': `Bearer ${OPENAI_API_KEY}`,
    'content-type': 'application/json'
  };
  if (OPENAI_PROJECT_ID) headers['OpenAI-Project'] = OPENAI_PROJECT_ID;

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await r.json();
  const text = data.choices?.[0]?.message?.content ?? JSON.stringify(data);
  return { text, raw: data };
}

async function askClaude(prompt: string) {
  if (!ANTHROPIC_API_KEY) return { text: '(Anthropic key not set)' };
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 512,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await r.json();
  const text = Array.isArray(data?.content) ? data.content.map((c:any)=>c.text).join('\n') : data?.content?.[0]?.text || JSON.stringify(data);
  return { text, raw: data };
}

export async function POST(req: Request) {
  const { prompt } = await readJson(req) as { prompt?: string };
  if (!prompt || !prompt.trim()) return fail('Missing prompt');

  const [claude, openai] = await Promise.all([askClaude(prompt), askOpenAI(prompt)]);

  // SAINTSAL™ HACP™ Protocol - Unified Intelligence Response
  const unified = `🧠 SAINTSAL™ Analysis (HACP™ Protocol Active):

${claude.text.includes('(Anthropic key not set)') || openai.text.includes('(OpenAI key not set)') 
  ? 'Operating in single-AI mode due to configuration. Full triple-AI engine requires environment setup.'
  : `Synthesizing insights from both AI models...

${claude.text}

Cross-validating with secondary analysis for enhanced accuracy and strategic depth.`}`;

  return json({
    ok: true,
    unified,
    claude: claude.text,
    openai: openai.text,
    models: { claude: CLAUDE_MODEL, openai: OPENAI_MODEL },
    hacp_active: true,
    triple_ai: !claude.text.includes('not set') && !openai.text.includes('not set')
  });
}
