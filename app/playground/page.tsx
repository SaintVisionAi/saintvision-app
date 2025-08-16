'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  model?: string
  timestamp: Date
  thinking?: boolean
  attachments?: File[]
}

interface ChatHistory {
  id: string
  name: string
  messages: Message[]
  created: Date
  lastUpdated: Date
}

interface Template {
  id: string
  name: string
  description: string
  prompt: string
  category: string
  icon: string
}

interface Workspace {
  id: string
  name: string
  description: string
  chats: string[]
  created: Date
}

export default function PlaygroundPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('saint-sal')
  const [isVisible, setIsVisible] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentView, setCurrentView] = useState<'chat' | 'history' | 'templates' | 'settings'>('chat')
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChat, setCurrentChat] = useState<string | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [currentWorkspace, setCurrentWorkspace] = useState<string>('default')
  
  // Advanced Settings
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(4000)
  const [systemPrompt, setSystemPrompt] = useState('')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickPrompts = [
    "Help me with business strategy and planning",
    "Review and optimize my code",
    "Create compelling marketing content", 
    "Analyze data and provide insights",
    "Review legal documents and compliance",
    "Financial planning and analysis",
    "Creative writing and storytelling",
    "Technical documentation",
    "Problem solving and troubleshooting"
  ]

  useEffect(() => {
    setIsVisible(true)
    // Check if user is new and show onboarding
    const hasSeenOnboarding = localStorage.getItem('playground-onboarding')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
    
    // Load chat history
    loadChatHistory()
    
    // Add welcome message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        content: 'Welcome to the SaintVision AI Enterprise Playground. I\'m SAINTSAL - your all-in-one AI that handles business strategy, code, content, analysis, legal, finance, and everything in between. What do you need help with today?',
        role: 'assistant',
        model: 'SAINT SAL™',
        timestamp: new Date()
      }])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadChatHistory = () => {
    const saved = localStorage.getItem('playground-history')
    if (saved) {
      setChatHistory(JSON.parse(saved))
    }
  }

  const saveChatHistory = () => {
    localStorage.setItem('playground-history', JSON.stringify(chatHistory))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      attachments: files.length > 0 ? files : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setFiles([])
    setIsLoading(true)

    try {
      // Add thinking message
      const thinkingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Analyzing your request and files...',
        role: 'assistant',
        model: selectedModel === 'saint-sal' ? 'SAINT SAL™' : selectedModel.toUpperCase(),
        timestamp: new Date(),
        thinking: true
      }
      setMessages(prev => [...prev, thinkingMessage])

      // Call the appropriate API based on selected model
      let endpoint = '/api/sal/chat'
      if (selectedModel === 'claude-4') endpoint = '/api/search/dual'
      if (selectedModel === 'o3') endpoint = '/api/search/dual'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: systemPrompt ? `${systemPrompt}\n\n${input}` : input,
          model: selectedModel,
          temperature,
          maxTokens,
          files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
        })
      })

      const data = await response.json()

      // Remove thinking message and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => !m.thinking)
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          content: data.response || data.unified || 'I understand your request. Let me help you with that.',
          role: 'assistant',
          model: data.model || 'SAINT SAL™',
          timestamp: new Date()
        }]
      })

    } catch (error) {
      console.error('Playground error:', error)
      setMessages(prev => {
        const filtered = prev.filter(m => !m.thinking)
        return [...filtered, {
          id: (Date.now() + 3).toString(),
          content: 'I apologize for the technical difficulty. Let me try a different approach to help you.',
          role: 'assistant',
          model: 'SAINT SAL™ (Fallback)',
          timestamp: new Date()
        }]
      })
    }

    setIsLoading(false)
  }

  const saveCurrentChat = () => {
    if (messages.length <= 1) return
    
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      name: `Chat ${chatHistory.length + 1}`,
      messages: [...messages],
      created: new Date(),
      lastUpdated: new Date()
    }
    
    const updated = [...chatHistory, newChat]
    setChatHistory(updated)
    localStorage.setItem('playground-history', JSON.stringify(updated))
    setCurrentChat(newChat.id)
  }

  const loadChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId)
    if (chat) {
      setMessages(chat.messages)
      setCurrentChat(chatId)
      setCurrentView('chat')
    }
  }

  const newChat = () => {
    setMessages([{
      id: '1',
      content: 'Welcome to the SaintVision AI Enterprise Playground. I\'m SAINTSAL - your all-in-one AI that handles business strategy, code, content, analysis, legal, finance, and everything in between. What do you need help with today?',
      role: 'assistant',
      model: 'SAINT SAL™',
      timestamp: new Date()
    }])
    setCurrentChat(null)
    setCurrentView('chat')
  }


  const exportChat = () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      settings: { temperature, maxTokens }
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `saintvision-chat-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Batcave Enterprise Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/90 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_center,_transparent_0deg,_rgba(59,130,246,0.05)_45deg,_transparent_90deg)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen">
        
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-700/50 bg-black/60 backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">AI Playground</h2>
                <p className="text-xs text-gray-400">Enterprise Command Center</p>
              </div>
            </div>
            
            <button
              onClick={newChat}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Chat</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <div className="space-y-2">
              {[
                { id: 'chat', label: 'Chat', icon: '💬' },
                { id: 'history', label: 'History', icon: '📜' },
                { id: 'templates', label: 'Quick Start', icon: '⚡' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    currentView === item.id 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content based on current view */}
          <div className="flex-1 overflow-y-auto p-4">
            
            {/* Chat History */}
            {currentView === 'history' && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white mb-4">Chat History</h3>
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      currentChat === chat.id
                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-xs text-gray-500">{chat.created.toLocaleDateString()}</div>
                  </button>
                ))}
                {chatHistory.length === 0 && (
                  <p className="text-gray-500 text-sm">No saved chats yet</p>
                )}
              </div>
            )}

            {/* Quick Prompts */}
            {currentView === 'templates' && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4">SAINTSAL Quick Start</h3>
                <p className="text-xs text-gray-400 mb-4">SAINTSAL does everything - just tell me what you need!</p>
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(prompt)
                      setCurrentView('chat')
                    }}
                    className="w-full text-left p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition text-sm text-gray-300"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            )}

            {/* Settings */}
            {currentView === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Advanced Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="saint-sal">SAINT SAL™ (Recommended)</option>
                    <option value="claude-4">Claude 4 Sonnet</option>
                    <option value="o3">OpenAI O3</option>
                    <option value="gpt-5">GPT-5 (Preview)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Temperature: {temperature}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Tokens: {maxTokens}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="8000"
                    step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Custom system instructions..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={exportChat}
                  className="w-full px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                >
                  Export Chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <div className="border-b border-gray-700/50 bg-black/40 backdrop-blur-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-light text-white">
                  Enterprise AI <span className="text-blue-400">Playground</span>
                </h1>
                <p className="text-gray-400">Professional-grade AI with advanced capabilities</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={saveCurrentChat}
                  disabled={messages.length <= 1}
                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition disabled:opacity-50"
                >
                  Save Chat
                </button>
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                >
                  Help
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-4xl ${
                  message.role === 'user' 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : message.role === 'system'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-gray-800/50 border-gray-700/50'
                } border rounded-2xl p-6 backdrop-blur-sm`}>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400 font-medium">{message.model}</span>
                      {message.thinking && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="text-white leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.attachments.map((file, i) => (
                        <div key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-400">
                          📎 {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-3">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div 
            className={`border-t border-gray-700/50 bg-black/40 backdrop-blur-sm p-6 ${dragActive ? 'bg-blue-500/10' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="max-w-4xl mx-auto space-y-4">
              
              {/* File Upload Area */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-800/50 rounded-lg">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-400">
                      <span>📎 {file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Ask SAINTSAL anything... I handle business, code, content, analysis, legal, finance - EVERYTHING! (Enterprise AI at your command)"
                    className="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={handleSend}
                    disabled={isLoading || (!input.trim() && files.length === 0)}
                    className="px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-black font-semibold rounded-xl hover:from-blue-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Enterprise AI • Drag & drop files • Press Enter to send</span>
                <span>Powered by HACP™ Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,.md,.csv,.json,.js,.ts,.py,.html,.css"
      />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-white">Welcome to SaintVision AI Playground</h2>
              <button
                onClick={() => {
                  setShowOnboarding(false)
                  localStorage.setItem('playground-onboarding', 'true')
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">🚀 Enterprise Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>File upload & analysis (PDF, DOC, CSV, Code)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Professional templates & prompts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Chat history & workspace management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Advanced model selection (Claude 4, O3, GPT-5)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Customizable AI settings & system prompts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span>Export conversations & results</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Quick Start</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">1. Choose Your AI Model</h4>
                    <p className="text-sm">Select from SAINT SAL™, Claude 4, O3, or GPT-5 in Settings</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">2. Upload Files</h4>
                    <p className="text-sm">Drag & drop documents for AI analysis and insights</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">3. Use Templates</h4>
                    <p className="text-sm">Professional prompts for business, code review, analysis</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">4. Save & Export</h4>
                    <p className="text-sm">Maintain chat history and export results</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setShowOnboarding(false)
                  localStorage.setItem('playground-onboarding', 'true')
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
              >
                Start Using Playground
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}