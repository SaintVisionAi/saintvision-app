import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'
// import { HACPCovenantEngine } from '@/lib/hacp/core/engine'

// TEMPORARILY DISABLED FOR VERCEL DEPLOYMENT - PRISMA BUILD ISSUES
// TODO: Re-enable after Prisma is properly configured for production

// Get conversation messages
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ error: 'API temporarily disabled for deployment' }, { status: 503 })
  /*
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messages = await prisma.message.findMany({
      where: { 
        conversationId: params.id,
        conversation: { userId: session.user.id }
      },
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

*/
}

// Send message to conversation  
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ error: 'API temporarily disabled for deployment' }, { status: 503 })
  /*
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Message content required' }, { status: 400 })
    }

    // Get conversation details
    const conversation = await prisma.conversation.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      }
    })

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        conversationId: params.id,
        role: 'user',
        content: content.trim()
      }
    })

    // Process with HACP™ engine
    const engine = new HACPCovenantEngine({
      name: 'SaintVisionAI™ HACP™ Engine',
      version: '2.0.0',
      nextjsIntegration: true
    })

    await engine.initialize()

    const enrichedContext = {
      user: { id: session.user.id },
      originalInput: content,
      timestamp: new Date().toISOString(),
      mode: conversation.mode,
      tier: conversation.tier,
      isFounder: session.user.isFounder,
      conversationId: params.id
    }

    const startTime = Date.now()
    const aiResponse = await engine.processMessage(content, enrichedContext)
    const processingTime = Date.now() - startTime

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: params.id,
        role: 'assistant',
        content: aiResponse.response,
        aiModel: 'hacp',
        tokensUsed: aiResponse.metadata.tokensUsed,
        processingTime,
        confidence: aiResponse.metadata.confidence,
        metadata: JSON.stringify(aiResponse.metadata)
      }
    })

    // Update conversation last message time
    await prisma.conversation.update({
      where: { id: params.id },
      data: { 
        lastMessageAt: new Date(),
        title: conversation.title || content.substring(0, 50) + '...'
      }
    })

    // Update analytics
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.userAnalytics.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      },
      update: {
        messagesCount: { increment: 1 },
        tokensUsed: { increment: aiResponse.metadata.tokensUsed || 0 },
        hacpCalls: { increment: 1 },
        avgResponseTime: processingTime
      },
      create: {
        userId: session.user.id,
        date: today,
        messagesCount: 1,
        tokensUsed: aiResponse.metadata.tokensUsed || 0,
        hacpCalls: 1,
        avgResponseTime: processingTime
      }
    })

    return NextResponse.json({
      userMessage,
      assistantMessage,
      metadata: aiResponse.metadata
    })

  } catch (error) {
    console.error('Failed to process message:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
  */
}