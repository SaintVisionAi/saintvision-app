'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ReactMarkdown from 'react-markdown'
import VoiceInput from './VoiceInput'
import FileDropZone from './FileDropZone'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
  aiModel?: string
  tokensUsed?: number
  processingTime?: number
}

interface EnhancedChatProps {
  conversationId?: string
  initialMessages?: Message[]
  onNewMessage?: (message: Message) => void
}

export default function EnhancedChat({ conversationId, initialMessages = [], onNewMessage }: EnhancedChatProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !conversationId) return

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      createdAt: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      
      // Update messages with actual IDs and add assistant response
      setMessages(prev => [
        ...prev.filter(m => m.id !== userMessage.id),
        data.userMessage,
        data.assistantMessage
      ])

      if (onNewMessage) {
        onNewMessage(data.assistantMessage)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'system',
        content: 'Sorry, there was an error processing your message. Please try again.',
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
    // Auto-send voice messages for better UX
    sendMessage(transcript)
  }

  const handleFilesUploaded = async (files: File[]) => {
    // For now, just add a message about the uploaded files
    // In a full implementation, you'd upload to storage and process
    const fileNames = files.map(f => f.name).join(', ')
    const fileMessage = `I've uploaded the following files: ${fileNames}. Please analyze them.`
    sendMessage(fileMessage)
    setShowFileUpload(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl mb-2">Welcome to SAINTSAL™</h2>
            <p>Your HACP™ protected AI is ready. How can I help you today?</p>
            <div className="mt-6 text-sm text-gray-600">
              <p>✨ Voice commands supported</p>
              <p>📎 File uploads available</p>
              <p>🔐 Patent #10,290,222 protected</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-yellow-500 text-black' 
                  : message.role === 'system'
                  ? 'bg-red-900 border border-red-700'
                  : 'bg-gray-800 border border-gray-700'
              }`}>
                {/* Message Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold">
                      {message.role === 'user' ? 'You' : message.role === 'system' ? 'System' : 'SaintSal™'}
                    </span>
                    {message.aiModel && (
                      <span className="text-xs bg-black/20 px-2 py-1 rounded">
                        {message.aiModel.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-60">
                    {formatTimestamp(message.createdAt)}
                  </span>
                </div>

                {/* Message Content */}
                <div className={`prose prose-sm max-w-none ${
                  message.role === 'user' ? 'prose-invert' : ''
                }`}>
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        code: ({ children, className }) => (
                          <code className={`${className} bg-black/30 px-1 py-0.5 rounded text-sm`}>
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto">
                            {children}
                          </pre>
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>

                {/* Message Metadata */}
                {message.tokensUsed && (
                  <div className="mt-2 text-xs opacity-60 flex items-center space-x-4">
                    <span>🔥 {message.tokensUsed} tokens</span>
                    {message.processingTime && (
                      <span>⚡ {(message.processingTime / 1000).toFixed(1)}s</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-400">SaintSal is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="border-t border-gray-800 p-4">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Upload Files</h3>
            <button
              onClick={() => setShowFileUpload(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <FileDropZone onFilesUploaded={handleFilesUploaded} />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-end space-x-2">
          {/* Voice Input */}
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />

          {/* File Upload Button */}
          <button
            onClick={() => setShowFileUpload(!showFileUpload)}
            disabled={isLoading}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            title="Upload files"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask SaintSal anything... (Shift+Enter for new line)"
              disabled={isLoading}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = '48px'
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`
              }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '...' : '⚡'}
          </button>
        </div>

        {/* Status */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>🤖 HACP™ Enhanced</span>
            <span>🔐 Patent #10,290,222</span>
            {session?.user.isFounder && (
              <span className="text-yellow-500">👑 Founder Mode</span>
            )}
          </div>
          <div>
            {input.length}/2000
          </div>
        </div>
      </div>
    </div>
  )
}