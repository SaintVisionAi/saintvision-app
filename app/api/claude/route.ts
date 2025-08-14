import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    
    return NextResponse.json({ 
      response: "SAL is initializing Claude connection...",
      status: "ready"
    })
  } catch (error: any) {
    return NextResponse.json({ 
      response: "SAL ready. Please retry.",
      error: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}
