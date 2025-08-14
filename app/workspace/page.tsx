'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WorkspacePage() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const router = useRouter()

  const sendMessage = async () => {
    if (!message.trim()) return
    
    setChat([...chat, { role: 'user', content: message }])
    setMessage('')
    
    try {
      const response = await fetch('/api/dual/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await response.json()
      setChat(prev => [...prev, { role: 'assistant', content: data.response || 'SAL is thinking...' }])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-4 border-r border-gray-800">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center text-black font-bold">
              SV
            </div>
            <div>
              <div className="font-bold">SaintVisionAI</div>
              <div className="text-xs text-gray-500">Workspace</div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => router.push('/pro')}
          className="w-full text-left p-2 hover:bg-gray-800 rounded mb-2"
        >
          Pro Dashboard
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-800 rounded mb-2">
          My Companion
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-800 rounded">
          Settings
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-800 p-4">
          <h1 className="text-xl font-bold">SAL Workspace</h1>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {chat.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl mb-2">Welcome to SAINTSAL</h2>
              <p>Your AI companion is ready. How can I help you today?</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl p-3 rounded-lg ${
                    msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-800 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask SAL anything..."
              className="flex-1 p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
