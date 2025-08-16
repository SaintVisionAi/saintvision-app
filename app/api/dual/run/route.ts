import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import {
  OPENAI_API_KEY,
  OPENAI_MODEL,
  OPENAI_PUBLISHED_PROMPT,
  OPENAI_PUBLISHED_PROMPT_VERSION,
  ANTHROPIC_API_KEY,
  CLAUDE_MODEL,
  CLAUDE_ALIAS_FALLBACK,
  CONFIG
} from '@/lib/env'

export const runtime = 'nodejs'

type Role = 'system' | 'user' | 'assistant'
type Msg = { role: Role; content: string }
type Body = {
  message: string
  history?: Msg[]
  provider?: 'openai' | 'anthropic' | 'auto'
  meta?: { emotion?: 'calm'|'frustrated'|'stressed'|'engaged'; priority?: 'speed'|'reasoning'|'cost' }
  usePrompt?: boolean // force using Published Prompt for OpenAI
}

function decideProvider(input: string, meta: Body['meta'] = {}): 'openai'|'anthropic' {
  const len = input?.length || 0
  if (meta?.priority === 'reasoning' || meta?.emotion === 'frustrated' || len > 1200) return 'anthropic'
  return 'openai'
}

function readOpenAIText(r: any): string {
  return r?.output_text
      ?? r?.content?.[0]?.text
      ?? r?.choices?.[0]?.message?.content
      ?? '…'
}

export async function POST(req: Request) {
  const { message, history = [], provider = 'auto', meta, usePrompt } = await req.json() as Body
  if (!message?.trim()) return NextResponse.json({ response: 'Ready when you are.' })

  const chosen = provider === 'auto' ? decideProvider(message, meta) : provider

  if (chosen === 'anthropic') {
    if (!ANTHROPIC_API_KEY) return NextResponse.json({ response: 'Missing ANTHROPIC_API_KEY' }, { status: 500 })
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
    const msgs = [...history, { role: 'user' as const, content: message }]

    const create = (model: string) => anthropic.messages.create({
      model,
      max_tokens: 1024,
      messages: msgs
    })

    try {
      const res = await create(CLAUDE_MODEL)
      const text = (res as any)?.content?.[0]?.text ?? '…'
      return NextResponse.json({ response: text, provider: 'anthropic', model: CLAUDE_MODEL })
    } catch (e: any) {
      const m = String(e?.message || '').toLowerCase()
      if (m.includes('model') || m.includes('not found') || m.includes('unsupported')) {
        const res2 = await create(CLAUDE_ALIAS_FALLBACK)
        const text2 = (res2 as any)?.content?.[0]?.text ?? '…'
        return NextResponse.json({ response: text2, provider: 'anthropic', model: CLAUDE_ALIAS_FALLBACK, note: 'alias-fallback' })
      }
      throw e
    }
  }

  // OpenAI path (Sticky Sal / Help Desk)
  if (!OPENAI_API_KEY) return NextResponse.json({ response: 'Missing OPENAI_API_KEY' }, { status: 500 })
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  const shouldUsePrompt = typeof usePrompt === 'boolean' ? usePrompt : CONFIG.preferOpenAIPrompt

  if (shouldUsePrompt && OPENAI_PUBLISHED_PROMPT) {
    // Use Published Prompt with variable injection (e.g., {{USER_INPUT}})
    const res = await openai.responses.create({
      model: OPENAI_MODEL,
      prompt: {
        id: OPENAI_PUBLISHED_PROMPT,
        version: OPENAI_PUBLISHED_PROMPT_VERSION,
        variables: { USER_INPUT: message }
      }
    } as any)
    const text = readOpenAIText(res)
    return NextResponse.json({ response: text, provider: 'openai', model: OPENAI_MODEL, prompt: OPENAI_PUBLISHED_PROMPT })
  }

  // Fallback to chat completions with history
  const res = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: 'system', content: 'You are SAL.' }, ...history, { role: 'user', content: message }]
  })
  const text = res.choices?.[0]?.message?.content ?? '…'
  return NextResponse.json({ response: text, provider: 'openai', model: OPENAI_MODEL })
}
