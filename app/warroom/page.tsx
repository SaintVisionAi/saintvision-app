'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function WarRoom() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{role: string, content: string, timestamp: string}>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const conversations = [
    { id: '1', title: 'Sales Strategy', date: 'Today', preview: 'Increase revenue 30%', icon: '💰' },
    { id: '2', title: 'Pipeline Analysis', date: 'Today', preview: 'Conversion optimization', icon: '📊' },
    { id: '3', title: 'Team Scaling', date: 'Yesterday', preview: 'Hiring roadmap Q1', icon: '👥' },
    { id: '4', title: 'Product Launch', date: 'Yesterday', preview: 'GTM strategy', icon: '🚀' },
  ]

  const tools = [
    { id: 'crm', name: 'CRM', icon: '📱', status: 'connected' },
    { id: 'calendar', name: 'Calendar', icon: '📅', status: 'connected' },
    { id: 'analytics', name: 'Analytics', icon: '📈', status: 'connected' },
    { id: 'documents', name: 'Documents', icon: '📄', status: 'ready' },
    { id: 'email', name: 'Email', icon: '✉️', status: 'ready' },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, newUserMessage])

    try {
      const response = await fetch('/api/sal/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          threadId: threadId 
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || 'Processing your request...',
        timestamp: new Date().toLocaleTimeString()
      }])

      if (data.threadId) setThreadId(data.threadId)

    } catch (error) {
      try {
        const fallbackResponse = await fetch('/api/search/dual', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userMessage })
        })
        
        const fallbackData = await fallbackResponse.json()
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: fallbackData.unified || fallbackData.claude || 'SAL is ready to help.',
          timestamp: new Date().toLocaleTimeString()
        }])
      } catch (fallbackError) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Reconnecting to SAL...',
          timestamp: new Date().toLocaleTimeString()
        }])
      }
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const startNewChat = () => {
    setMessages([])
    setThreadId(null)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="fixed inset-0 bg-black flex overflow-hidden z-50">
      {/* Left Sidebar - SICK DESIGN */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-16'} transition-all duration-300 bg-black border-r border-gray-900 flex flex-col relative`}>
        {/* Fixed Cookin Knowledge Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/logos/cookin.png"
            alt="Background"
            fill
            className="object-contain object-center opacity-10"
          />
        </div>
        
        {/* Sidebar Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with Logo */}
          <div className="p-4 border-b border-gray-900">
            <div className="flex items-center justify-between">
              <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
                <Image
                  src="/logos/saintsaltransparent.png"
                  alt="SAINT SAL"
                  width={140}
                  height={60}
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-yellow-500 transition p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                </svg>
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={startNewChat}
              className={`w-full px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/30 transition flex items-center ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'}`}
            >
              <span className="text-xl">✨</span>
              {sidebarOpen && <span className="text-sm font-medium tracking-wider">NEW CHAT</span>}
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-4">
            {sidebarOpen ? (
              <>
                <div className="text-xs tracking-[0.3em] text-gray-600 mb-3">RECENT</div>
                <div className="space-y-2">
                  {conversations.map(conv => (
                    <button
                      key={conv.id}
                      className="w-full text-left p-3 rounded-lg bg-gray-950/30 hover:bg-gray-900/50 border border-gray-900 hover:border-gray-800 transition group"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{conv.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-200 group-hover:text-white font-medium">
                            {conv.title}
                          </div>
                          <div className="text-xs text-gray-600 truncate mt-1">
                            {conv.preview}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 4).map(conv => (
                  <button
                    key={conv.id}
                    className="w-full p-2 rounded-lg hover:bg-gray-900/50 transition flex justify-center"
                    title={conv.title}
                  >
                    <span className="text-lg">{conv.icon}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section - Model Info */}
          <div className="p-4 border-t border-gray-900">
            <div className={`bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg p-3 border border-yellow-500/30 ${!sidebarOpen && 'p-2'}`}>
              {sidebarOpen ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">ACTIVE MODEL</span>
                    <span className="text-xs text-green-500">● LIVE</span>
                  </div>
                  <div className="text-sm font-medium text-yellow-500">SAINT SAL™</div>
                  <div className="text-xs text-gray-600 mt-1">HACP™ Protocol</div>
                </>
              ) : (
                <div className="text-center">
                  <span className="text-xs text-green-500">●</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Header */}
        <div className="bg-black border-b border-gray-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logos/LOGOHEADER.png"
                alt="Logo"
                height={40}
                width={120}
                className="object-contain"
              />
              <div className="text-sm text-gray-500">|</div>
              <div>
                <h1 className="text-lg font-light tracking-wider text-white">WARROOM</h1>
                <p className="text-xs text-gray-600">Strategic Command Center</p>
              </div>
            </div>
            
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="text-gray-500 hover:text-yellow-500 transition p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center py-20">
              <div className="mb-8 relative">
                <Image
                  src="/logos/GOTTAGUY.png"
                  alt="SAL"
                  width={200}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-3xl font-thin mb-4 text-white">Strategic Command Activated</h2>
              <p className="text-gray-500 mb-8">
                I'm SAL, your AI business partner. Let's dominate your market.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  '📊 Analyze my business metrics',
                  '🚀 Create growth strategy',
                  '💰 Optimize revenue streams',
                  '🎯 Identify market opportunities'
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(suggestion.substring(2))
                      inputRef.current?.focus()
                    }}
                    className="text-left p-4 bg-gradient-to-r from-gray-950/50 to-gray-900/30 border border-gray-900 rounded-lg hover:border-yellow-500/30 transition group"
                  >
                    <span className="text-sm text-gray-400 group-hover:text-white">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%]`}>
                    <div className={`rounded-lg px-6 py-4 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 text-white' 
                        : 'bg-gray-950/50 border border-gray-900 text-gray-300'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs text-gray-600 mt-2">{message.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-900 bg-black px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Command SAL..."
                rows={2}
                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-900 rounded-lg resize-none focus:border-yellow-500/50 focus:outline-none text-white placeholder-gray-600"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '...' : '→'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Collapsible Tools/Integration */}
      <div className={`${rightPanelOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-black border-l border-gray-900 flex flex-col`}>
        <div className="p-4 border-b border-gray-900">
          <div className={`${rightPanelOpen ? 'block' : 'hidden'}`}>
            <h3 className="text-sm font-medium tracking-wider text-gray-400">INTEGRATIONS</h3>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {rightPanelOpen ? (
            <div className="space-y-3">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  className="w-full p-3 bg-gray-950/30 hover:bg-gray-900/50 border border-gray-900 hover:border-gray-800 rounded-lg transition flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-sm text-gray-400 group-hover:text-white">{tool.name}</span>
                  </div>
                  <span className={`text-xs ${tool.status === 'connected' ? 'text-green-500' : 'text-gray-600'}`}>
                    {tool.status === 'connected' ? '●' : '○'}
                  </span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-900">
                <button className="w-full p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/20 transition">
                  <span className="text-sm">Connect CRM →</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  className="w-full p-2 rounded-lg hover:bg-gray-900/50 transition flex justify-center"
                  title={tool.name}
                >
                  <span className="text-lg">{tool.icon}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
