import { NextRequest } from "next/server";
import { openai, OPENAI_MODEL, OPENAI_PROJECT, OPENAI_INSTRUCTIONS } from "@/lib/openai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ ok:false, error:"Missing prompt" }), { status:400 });
    }
    const r = await openai.responses.create(
      { model: OPENAI_MODEL, instructions: OPENAI_INSTRUCTIONS, input: prompt },
      { headers: OPENAI_PROJECT ? { "OpenAI-Project": OPENAI_PROJECT } : undefined }
    );
    return Response.json({ ok:true, text: (r.output_text || "").trim() });
  } catch (e:any) {
    return new Response(JSON.stringify({ ok:false, error:e?.message || "OpenAI error" }), { status:500 });
  }
}
