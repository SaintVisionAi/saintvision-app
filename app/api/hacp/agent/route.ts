// ================================
// HACP™ COVENANT ENGINE - Next.js API Route
// Claude 4 Sonnet 1M Token Integration
// ================================

import { NextRequest, NextResponse } from 'next/server';
import { HACPCovenantEngine } from '@/lib/hacp/core/engine';
import { logger } from '@/lib/hacp/utils/logger';

// Initialize HACP™ engine (singleton)
let hacpEngine: HACPCovenantEngine | null = null;

async function getHACPEngine() {
  if (!hacpEngine) {
    hacpEngine = new HACPCovenantEngine({
      name: 'SaintVisionAI™ HACP™ Engine',
      version: '2.0.0',
      nextjsIntegration: true
    });
    await hacpEngine.initialize();
  }
  return hacpEngine;
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      logger.error('Invalid JSON in request:', jsonError);
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }
    
    const { message, userId, context = {} } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const engine = await getHACPEngine();
    
    const enrichedContext = {
      ...context,
      user: { id: userId },
      originalInput: message,
      timestamp: new Date().toISOString(),
      nextjsRoute: true,
      claude4Enhanced: true
    };

    const response = await engine.processMessage(message, enrichedContext);
    
    return NextResponse.json({
      success: true,
      response: response.response,
      metadata: response.metadata,
      engine: 'HACP™ v2.0.0 Next.js Claude 4 Enhanced',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('HACP™ API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'HACP™ engine error',
        message: 'The Claude 4 enhanced engine encountered an error.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    engine: 'HACP™ Covenant Engine',
    version: '2.0.0',
    status: 'operational',
    model: process.env.ANTHROPIC_CLAUDE_MODEL,
    maxTokens: process.env.MAX_TOKENS,
    integration: 'Next.js',
    timestamp: new Date().toISOString()
  });
}
