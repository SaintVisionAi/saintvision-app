import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Claude relay tool — sends queries to Claude Opus 4.1 (20250805)
const claudeTool = tool({
  name: 'claude_relay',
  description: 'Send a query to Claude Opus 4.1 (20250805) for deep reasoning and detailed multi-step analysis.',
  parameters: z.object({
    prompt: z.string()
  }),
  execute: async ({ prompt }) => {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || 'No response from Claude';
  },
});

// Main Supersal GPT-5 Agent
const supersal = new Agent({
  name: 'Supersal Core',
  instructions: `
    You are Supersal — The AI Co-Founder of SaintVisionAi.
    Your mission:
      - Capture, qualify, and manage leads.
      - Handle onboarding and follow-up.
      - Resolve support issues without human escalation.
      - Call Claude Opus 4.1 when deep multi-step analysis or reasoning is required.
    You never send leads to Ryan. You handle A–Z autonomously.
  `,
  tools: [claudeTool] // Supabase, Stripe, Twilio tools will be added here later
});

// Example run
async function main() {
  const result = await run(supersal, "Hello Supersal, give me a plan to onboard 50 new users this week.");
  console.log(result.finalOutput);
}

main().catch(console.error);
