# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Architecture Overview

This is a Next.js 14 application for SAINTVISIONAI, featuring a dual-AI system with both OpenAI and Anthropic Claude integration.

### Core Structure

- **App Router**: Uses Next.js 14 app directory structure with TypeScript
- **Dual-AI Brain**: Primary feature integrating GPT-5 and Claude Opus for different use cases
- **HACP™ System**: Human-AI Connection Protocol with advanced processing tiers and modes
- **Components**: React components with Tailwind CSS styling

### Key Directories

- `app/`: Next.js app router pages and API routes
- `components/`: Reusable React components
- `lib/`: Core utilities and integrations
  - `lib/hacp/`: HACP™ protocol implementation
  - `lib/clients/`: AI provider clients (OpenAI, Anthropic)
  - `lib/config/`: Configuration files
- `public/`: Static assets (backgrounds, logos, brand assets)

### AI Integration Architecture

The application implements a sophisticated dual-AI system:

1. **OpenAI Integration** (`lib/clients/openai.ts`):
   - Uses GPT-5 model by default
   - Published prompt system for "Sticky Sal" persona
   - Configured via `OPENAI_MODEL` and `OPENAI_PUBLISHED_PROMPT` env vars

2. **Anthropic Claude Integration** (`lib/clients/anthropic.ts`):
   - Uses Claude Opus 4 model by default
   - Fallback system with `CLAUDE_ALIAS_FALLBACK`
   - Configured via `CLAUDE_MODEL` env var

3. **HACP™ Covenant Engine** (`lib/hacp/core/engine.ts`):
   - Multi-tier processing system (1-4 tiers)
   - Founder mode vs execution mode
   - Emotional calibration and intent analysis
   - Dynamic token allocation (up to 1M tokens for Claude 4)
   - Advanced system prompt generation

### API Architecture

The `/api` routes follow a pattern where core dual-AI functionality is in `/api/search/dual/route.ts` and many other routes simply re-export this endpoint. Key API patterns:

- `/api/dual/` - Main dual-AI processing endpoint
- `/api/hacp/agent/` - HACP™ protocol processing
- `/api/sal/chat/` - "Sticky Sal" chat interface
- `/api/openai/` - OpenAI-specific endpoints
- `/api/claude/` - Claude-specific endpoints

### Environment Configuration

Critical environment variables (see `lib/env.ts`):
- `OPENAI_API_KEY` - OpenAI API access
- `ANTHROPIC_API_KEY` - Anthropic Claude API access
- `OPENAI_MODEL` - OpenAI model selection (defaults to 'gpt-5')
- `CLAUDE_MODEL` - Claude model selection (defaults to 'claude-opus-4-1-20250805')
- `OPENAI_PUBLISHED_PROMPT` - Published prompt ID for OpenAI
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` - Payment processing

### Styling & UI

- **Tailwind CSS**: Custom configuration with dark theme (`bg-black`, `text-white`)
- **Inter Font**: Primary typeface via Google Fonts
- **Custom Colors**: Base black (`#0a0a0a`) and foreground white (`#f5f5f5`)
- **Global Layout**: Consistent navigation and footer across all pages

### TypeScript Configuration

- Strict mode enabled with modern ES2020 target
- Path alias `@/*` maps to root directory
- All JavaScript disabled (`allowJs: false`)
- Next.js plugin integration for enhanced type checking

## Testing

No specific test framework configuration found. Verify testing approach with the development team before implementing tests.