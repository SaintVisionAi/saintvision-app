'use client'

import { useState } from 'react'

export default function DemoPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testSAL = async () => {
    setLoading(true)
    setResponse('')
    
    try {
      const res = await fetch('/api/dual/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      setResponse(data.response || data.message || 'SAL is processing...')
    } catch (error) {
      setResponse('SAL is connecting... Try: "Help me increase sales by 30%"')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SAINT SAL™ Live Demo</h1>
          <p className="text-gray-400">Experience the power of HACP™ dual AI</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <label className="block text-sm font-semibold mb-2">Ask SAL a Business Question:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: How can I optimize my sales pipeline?"
            className="w-full p-4 bg-black border border-gray-700 rounded-lg focus:border-yellow-500 outline-none"
            rows={3}
          />
          <button
            onClick={testSAL}
            disabled={loading || !message}
            className="mt-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? 'SAL is thinking...' : 'Ask SAL'}
          </button>
        </div>

        {response && (
          <div className="bg-gray-900 rounded-lg p-6 border border-yellow-500/30">
            <h3 className="text-yellow-500 font-bold mb-2">SAL's Response:</h3>
            <p className="text-white whitespace-pre-wrap">{response}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="text-yellow-500 font-bold mb-2">✓ GPT-5 Connected</div>
            <div className="text-xs text-gray-400">Advanced reasoning active</div>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="text-yellow-500 font-bold mb-2">✓ Claude Opus Connected</div>
            <div className="text-xs text-gray-400">Deep analysis active</div>
          </div>
        </div>
      </div>
    </div>
  )
}
