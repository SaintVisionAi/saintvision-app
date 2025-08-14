'use client'
import { useState } from 'react'

export default function WorkspaceClient(){
  const [q, setQ] = useState('')
  const [logs, setLogs] = useState<string[]>([])

  const runSearch = () => {
    if (!q.trim()) return
    setLogs((l)=>[`SENT: ${q}`, ...l])
    setQ('')
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
        <label className="text-sm block mb-2 opacity-80">Search (Dual-AI ready)</label>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-transparent border border-white/20 rounded-xl px-3 py-2 text-sm outline-none"
            placeholder="Ask anything… (Enter to run)"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            onKeyDown={(e)=> e.key==='Enter' ? runSearch() : null}
          />
          <button className="rounded-xl border border-white/20 px-4 text-sm hover:bg-white/10" onClick={runSearch}>Search</button>
          <button className="rounded-xl border border-white/20 px-3 text-sm hover:bg-white/10" onClick={()=>setLogs([])} title="Clear results">Clear</button>
        </div>
        <p className="text-xs text-white/60 mt-2">Will connect to <code>/api/search/dual</code> (OpenAI + Azure).</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2 rounded-2xl border border-white/10 p-4 bg-black/30 min-h-[240px]">
          <div className="text-sm opacity-80 mb-2">Results</div>
          {logs.length === 0 ? (
            <div className="text-white/50 text-sm">No results yet — run a search.</div>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((line, i)=>(
                <li key={i} className="rounded-lg border border-white/10 p-2 bg-black/20">{line}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
          <div className="text-sm opacity-80 mb-2">Quick Actions</div>
          <div className="grid gap-2">
            <a href="/agents" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Start an Agent</a>
            <a href="/crm" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Send to CRM</a>
            <a href="/pricing" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Go Pro</a>
          </div>
          <div className="text-xs text-white/50 mt-3">Shortcuts: <kbd>Enter</kbd> run • <kbd>⌘K</kbd> (soon)</div>
        </div>
      </div>
    </>
  )
}
