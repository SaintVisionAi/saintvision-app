import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// TEMPORARILY DISABLED FOR VERCEL DEPLOYMENT - PRISMA BUILD ISSUES
// TODO: Re-enable after Prisma is properly configured for production

// Get user conversations
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'API temporarily disabled for deployment' }, { status: 503 })
}

// Create new conversation
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'API temporarily disabled for deployment' }, { status: 503 })
}