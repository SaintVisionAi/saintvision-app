import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get user conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const conversations = await prisma.conversation.findMany({
      where: { 
        userId: session.user.id,
        isArchived: false 
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1 // Get last message for preview
        }
      },
      orderBy: { lastMessageAt: 'desc' }
    })

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error('Failed to fetch conversations:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Create new conversation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, mode = 'execution', aiModel = 'hacp' } = await request.json()

    // Determine tier based on user
    const tier = session.user.isFounder ? 4 : 
                 session.user.tier === 'enterprise' ? 3 :
                 session.user.tier === 'pro' ? 2 : 1

    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        title: title || `New Conversation`,
        mode: session.user.isFounder ? 'founder' : mode,
        tier,
        aiModel
      }
    })

    return NextResponse.json({ conversation })
  } catch (error) {
    console.error('Failed to create conversation:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}