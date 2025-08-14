import { CONFIG, requireEnv } from "@/lib/env";

export async function GET() {
  try {
    const key = requireEnv("azureSpeechKey");
    const region = CONFIG.azureSpeechRegion || "eastus";
    const endpointBase =
      CONFIG.azureSpeechEndpoint?.replace(/\/+$/, "") ||
      `https://${region}.api.cognitive.microsoft.com`;

    // Azure Speech token endpoint
    const url = `${endpointBase}/sts/v1.0/issueToken`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": key },
    });

    if (!r.ok) {
      const t = await r.text();
      return new Response(`Azure token error: ${r.status} ${t}`, { status: 502 });
    }

    const token = await r.text();
    return Response.json({ ok: true, token, region });
  } catch (e: any) {
    return new Response(e?.message || "Azure token error", { status: 500 });
  }
}
