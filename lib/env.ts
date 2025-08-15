/**
 * Server-only env + model selection for the Dual-AI Brain.
 * Never expose these on the client (no NEXT_PUBLIC_* here).
 */

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';

/** OpenAI defaults (Sticky Sal / Help Desk) */
export const OPENAI_MODEL =
  (process.env.OPENAI_MODEL ?? '').trim() || 'gpt-5';      // Your GPT-5 slot
export const OPENAI_PUBLISHED_PROMPT =
  (process.env.OPENAI_PUBLISHED_PROMPT ?? '').trim() || ''; // pmpt_...
export const OPENAI_PUBLISHED_PROMPT_VERSION =
  (process.env.OPENAI_PUBLISHED_PROMPT_VERSION ?? '').trim() || '6';

/** Anthropic (Claude) defaults */
export const CLAUDE_MODEL =
  (process.env.CLAUDE_MODEL ?? process.env.ANTHROPIC_CLAUDE_MODEL ?? '').trim()
  || 'claude-opus-4-1-20250805';
export const CLAUDE_ALIAS_FALLBACK = 'claude-opus-4-1';

/** Stripe (if you use the Next.js webhook) */
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? '';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''; // <-- must be whsec_...

export const CONFIG = {
  hasOpenAI: !!OPENAI_API_KEY,
  hasAnthropic: !!ANTHROPIC_API_KEY,
  providerDefaults: {
    openai: OPENAI_MODEL,
    anthropic: CLAUDE_MODEL,
  },
  // If a Published Prompt ID is present, we auto-use it for OpenAI requests.
  preferOpenAIPrompt: !!OPENAI_PUBLISHED_PROMPT,
} as const;
