import OpenAI from 'openai'

export const OPENAI_PROJECT = process.env.OPENAI_PROJECT_ID || ''
export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4-1106-preview'
export const OPENAI_INSTRUCTIONS = process.env.OPENAI_PUBLISHED_PROMPT || ''

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION
})

export default openai
