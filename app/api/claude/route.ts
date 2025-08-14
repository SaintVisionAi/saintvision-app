export async function POST(req: Request) {
  const { message } = await req.json()
  
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 500,
        system: 'You are SAINT DR™ SAL. Elite shepherd. Precise, actionable, "I got you" energy.',
        messages: [{ role: 'user', content: message }]
      })
    })
    
    const data = await res.json()
    return Response.json({ 
      response: data.content?.[0]?.text || "Brother, I'm here."
    })
  } catch (e) {
    return Response.json({ response: "SAL ready. Retry." })
  }
}
EOFçmkdir -p app/api/health

cat > app/api/health/route.ts <<'EOF'
/* /api/health — lightweight service & env check */
export const dynamic = 'force-dynamic';

type BoolMap = Record<string, boolean>;

function present(name: string): boolean {
  const v = process.env[name];
  return !!(v && String(v).trim());
}

export async function GET() {
  // env presence checks (no outbound calls)
  const checks: BoolMap = {
    OPENAI_API_KEY:         present('OPENAI_API_KEY'),
    OPENAI_PROJECT_ID:      present('OPENAI_PROJECT_ID'),
    OPENAI_ASSISTANT_ID:    present('OPENAI_ASSISTANT_ID'),
    OPENAI_MODEL:           present('OPENAI_MODEL'),

    ANTHROPIC_API_KEY:      present('ANTHROPIC_API_KEY'),
    ANTHROPIC_CLAUDE_MODEL: present('ANTHROPIC_CLAUDE_MODEL'),

    NEXT_PUBLIC_SUPABASE_URL:   present('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: present('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    SUPABASE_SERVICE_ROLE_KEY:  present('SUPABASE_SERVICE_ROLE_KEY'),

    STRIPE_SECRET_KEY:      present('STRIPE_SECRET_KEY'),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: present('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),

    GHL_API_KEY:            present('GHL_API_KEY'),
    GHL_LOCATION_ID:        present('GHL_LOCATION_ID'),

    TWILIO_ACCOUNT_SID:     present('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN:      present('TWILIO_AUTH_TOKEN'),

    AZURE_SPEECH_API_KEY:   present('AZURE_SPEECH_API_KEY'),
    AZURE_SPEECH_REGION:    present('AZURE_SPEECH_REGION'),

    UPSTASH_VECTOR_REST_URL:   present('UPSTASH_VECTOR_REST_URL'),
    UPSTASH_VECTOR_REST_TOKEN: present('UPSTASH_VECTOR_REST_TOKEN'),

    SLACK_INCOMING_WEBHOOK_URL: present('SLACK_INCOMING_WEBHOOK_URL'),
    NOTION_API_KEY:             present('NOTION_API_KEY'),
  };

  const models = {
    openai:  process.env.OPENAI_MODEL || null,
    claude:  process.env.ANTHROPIC_CLAUDE_MODEL || null,
  };

  const meta = {
    route: 'health',
    ts: new Date().toISOString(),
    env: process.env.NEXT_PUBLIC_ENV || 'dev',
    portHint: process.env.PORT || null,
    app: process.env.NEXT_PUBLIC_APP_NAME || null,
  };

  const ok = Object.values(checks).every(Boolean);

  return Response.json({ ok, meta, models, checks });
}
