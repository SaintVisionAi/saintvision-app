import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    
    return NextResponse.json({
      answer: `SAL processing: "${question}"`,
      model: 'claude-3-opus'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
