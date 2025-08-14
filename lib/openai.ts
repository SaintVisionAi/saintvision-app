import OpenAI from 'openai'

export const OPENAI_PROJECT = process.env.OPENAI_PROJECT_ID || ''

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default openai
