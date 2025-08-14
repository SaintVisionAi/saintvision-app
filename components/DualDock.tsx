'use client';
import React, { useState } from 'react';

export default function DualDock() {
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<string>('');
  const [mode, setMode] = useState<'dual'|'saintsal'>('dual');

  async function run() {
    if (!q.trim()) return;
    setBusy(true); setRes('');
    try {
      const url = mode === 'dual' ? '/api/dual/run' : '/api/prompt/run';
      const body = mode === 'dual' ? { prompt: q } : { input: q };
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const raw = await r.text();
      let data: any = null;
      try { data = JSON.parse(raw); } catch {/* non-JSON fallback */}
      if (!r.ok) {
        setRes(data?.error ? `HTTP ${r.status}\n${data.error}` : `HTTP ${r.status}\n${raw}`);
        return;
      }
      setRes(data?.unified || data?.text || data?.claude || data?.openai || 'No response');
    } catch (e: any) {
      setRes(e?.message || 'Client error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 text-xs">
        <button onClick={() => setMode('dual')}
          className={`px-2 py-1 rounded border ${mode==='dual'?'border-white/60':'border-white/20'}`}>
          Dual (Claude + OpenAI)
        </button>
        <button onClick={() => setMode('saintsal')}
          className={`px-2 py-1 rounded border ${mode==='saintsal'?'border-white/60':'border-white/20'}`}>
          SAINTSAL Prompt
        </button>
      </div>
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder="Ask about pipeline analysis, CRM workflows, or strategy…"
          className="flex-1 rounded border border-white/20 bg-black/40 px-3 py-2"
        />
        <button onClick={run} disabled={busy} className="px-4 py-2 rounded border border-white/30">
          {busy ? 'Running…' : 'Send'}
        </button>
      </div>
      {res && <pre className="whitespace-pre-wrap text-sm opacity-90">{res}</pre>}
    </div>
  );
}
