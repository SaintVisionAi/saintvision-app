import Anthropic from '@anthropic-ai/sdk';

export const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Fall back to a known model name if env not set
export const CLAUDE_MODEL =
  process.env.ANTHROPIC_CLAUDE_MODEL || 'claude-3-5-sonnet-20240620';
