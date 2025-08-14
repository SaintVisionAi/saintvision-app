import 'dotenv/config';
import { Agent, run, tool, setDefaultOpenAIKey } from '@openai/agents';

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY'); process.exit(1);
}
setDefaultOpenAIKey(process.env.OPENAI_API_KEY);

// tiny demo tool
const echoTool = tool({
  name: 'echo',
  description: 'Echo back a short phrase',
  parameters: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] },
  execute: async ({ text }) => `ECHO: ${text}`,
});

// two simple agents to prove orchestration
const claudeAdvisor = new Agent({
  name: 'Claude Advisor',
  instructions:
    'Client-first strategist. Ask clarifying questions when needed. Be concise, human, and helpful.',
  tools: [echoTool],
  // model omitted → project default; set if you want a specific OpenAI model here
});

const gptExecutor = new Agent({
  name: 'GPT Executor',
  instructions: 'You execute structured tasks and produce bulletproof outputs.',
  // model: 'gpt-4.1-mini' // or your assigned model
});

const triage = new Agent({
  name: 'Supersal Orchestrator',
  instructions: 'Route to Advisor for client intent; route to Executor for structured deliverables.',
  handoffs: [claudeAdvisor, gptExecutor],
});

const prompt = process.argv.slice(2).join(' ') || 'Onboard a real estate investor seeking multi-property risk assessment.';
const result = await run(triage, prompt);
console.log('\n=== FINAL OUTPUT ===\n' + result.finalOutput + '\n');
