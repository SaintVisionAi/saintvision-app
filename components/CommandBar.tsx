"use client";
import { useState } from "react";

export default function CommandBar() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState("");

  async function run() {
    if (!q.trim()) return;
    setBusy(true); setRes("");
    try {
      const r = await fetch("/api/dual/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      });
      const data = await r.json();
      setRes(data.unified || data.claude || data.openai || "No response");
    } catch (e:any) {
      setRes(e?.message || "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Ask about pipeline analysis, CRM workflows, or strategy..."
          className="flex-1 rounded border border-white/20 bg-black/40 px-3 py-2"
        />
        <button onClick={run} disabled={busy} className="px-4 py-2 rounded border border-white/30">
          {busy ? "Running..." : "Send"}
        </button>
      </div>
      {res && (
        <pre className="whitespace-pre-wrap text-sm opacity-90">{res}</pre>
      )}
    </div>
  );
}
