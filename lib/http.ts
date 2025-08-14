import { NextResponse } from 'next/server'

export function json(data: any, status = 200) {
  return NextResponse.json(data, { status })
}

export function fail(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status })
}

export async function readJson(request: Request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

export function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status })
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status })
}
