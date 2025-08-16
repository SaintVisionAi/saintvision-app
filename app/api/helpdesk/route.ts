import { readJson, json, fail } from '@/lib/http';
import { SLACK_WEBHOOK } from '@/lib/env';

export async function POST(req: Request) {
  const { subject, message, severity = 'normal', userEmail, tone, tier } = await readJson(req);
  if (!message) return fail('message required');

  if (!SLACK_WEBHOOK) {
    // Still succeed, but indicate local-only log
    return json({ ok: true, mode: 'local', ticket: { subject, message, severity, userEmail, tone, tier } });
  }

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: `Support: ${subject || 'New ticket'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Severity:* ${severity}\n*From:* ${userEmail || 'n/a'}\n*Tone:* ${tone || 'n/a'} | *Tier:* ${tier ?? 'n/a'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: '```' + message + '```' } }
  ];

  const r = await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });

  if (!r.ok) return fail('Slack webhook failed', r.status);
  return json({ ok: true });
}
