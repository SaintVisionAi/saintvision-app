import { CONFIG, CLAUDE_MODEL, OPENAI_MODEL } from "@/lib/env";

export async function GET() {
  const status = {
    anthropic: !!CONFIG.anthropicKey,
    openai: !!CONFIG.openaiKey,
    slack: !!CONFIG.slackWebhook,
    ghl: !!CONFIG.ghlApiKey,
    azureSpeech: !!(CONFIG.azureSpeechKey && CONFIG.azureSpeechRegion),
    upstashVector: !!(CONFIG.upstashUrl && CONFIG.upstashToken),
    models: { claude: CLAUDE_MODEL, openai: OPENAI_MODEL },
  };
  return Response.json({ ok: true, status });
}
