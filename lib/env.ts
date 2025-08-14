/**
 * Centralized env loader. Trims whitespace and strips common smart chars.
 */
function clean(v?: string | null) {
  if (!v) return '';
  return v
    .replace(/\u2018|\u2019|\u201C|\u201D/g, "'")  // smart quotes -> '
    .replace(/\u2026/g, '...')                   // ellipsis -> ...
    .trim();
}

export const OPENAI_API_KEY = clean(process.env.OPENAI_API_KEY);
export const OPENAI_PROJECT_ID = clean(process.env.OPENAI_PROJECT_ID);
export const OPENAI_MODEL = clean(process.env.OPENAI_MODEL) || 'gpt-4.1-mini';

export const ANTHROPIC_API_KEY = clean(process.env.ANTHROPIC_API_KEY);
export const CLAUDE_MODEL = clean(process.env.ANTHROPIC_CLAUDE_MODEL) || 'claude-3-5-sonnet-20240620';

export const SLACK_WEBHOOK = clean(process.env.SLACK_INCOMING_WEBHOOK_URL) || clean(process.env.SLACK_ALERT_WEBHOOK);

export const GHL_LOCATION_API_KEY = clean(process.env.GHL_LOCATION_API_KEY) || clean(process.env.GHL_LOCATION_KEY);
export const GHL_LOCATION_ID = clean(process.env.GHL_LOCATION_ID);

export const UPSTASH_VECTOR_REST_URL = clean(process.env.UPSTASH_VECTOR_REST_URL);
export const UPSTASH_VECTOR_REST_TOKEN = clean(process.env.UPSTASH_VECTOR_REST_TOKEN);

export const PMPT_DEFAULT_ID = 'pmpt_689de0aba68881948e84c89e3d373d4408eead4383a5cc06'; // your published prompt id
