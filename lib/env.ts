export function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const CONFIG = {
  AZURE_SPEECH_KEY: process.env.AZURE_SPEECH_API_KEY || '',
  AZURE_SPEECH_REGION: process.env.AZURE_SPEECH_REGION || 'eastus',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || ''
}
