export async function GET() {
  return Response.json({
    ok: true,
    routes: ['/api/health','/api/dual/run','/api/prompt/run'],
    env: {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasProject: !!process.env.OPENAI_PROJECT_ID,
      hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
    },
  });
}
