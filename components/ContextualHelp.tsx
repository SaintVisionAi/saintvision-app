'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface HelpTip {
  id: string
  trigger: string
  title: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
  priority: number
}

const HELP_TIPS: HelpTip[] = [
  {
    id: 'voice-help',
    trigger: 'voice-button-hover',
    title: 'Voice Commands',
    content: 'Speak naturally! I understand context, intentions, and complex requests. Perfect for hands-free operation.',
    position: 'top',
    priority: 1
  },
  {
    id: 'file-help',
    trigger: 'file-button-hover',
    title: 'Smart File Analysis',
    content: 'Upload documents, images, or data files. I can analyze, summarize, extract insights, and answer questions about your content.',
    position: 'top',
    priority: 2
  },
  {
    id: 'memory-help',
    trigger: 'conversation-empty',
    title: 'Persistent Memory',
    content: 'I remember our entire conversation history and your preferences. Each interaction builds on our relationship.',
    position: 'bottom',
    priority: 3
  },
  {
    id: 'tier-upgrade',
    trigger: 'rate-limit-approached',
    title: 'Upgrade Available',
    content: 'Unlock unlimited conversations, faster responses, and enterprise features with Pro or Enterprise tiers.',
    position: 'top',
    priority: 4
  }
]

interface ContextualHelpProps {
  trigger?: string
  position?: { x: number; y: number }
}

export default function ContextualHelp({ trigger, position }: ContextualHelpProps) {
  const { data: session } = useSession()
  const [activeTip, setActiveTip] = useState<HelpTip | null>(null)
  const [dismissedTips, setDismissedTips] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load dismissed tips from localStorage
    const dismissed = localStorage.getItem('saintvision-dismissed-tips')
    if (dismissed) {
      setDismissedTips(JSON.parse(dismissed))
    }
  }, [])

  useEffect(() => {
    if (trigger && !dismissedTips.includes(trigger)) {
      const tip = HELP_TIPS.find(t => t.trigger === trigger)
      if (tip) {
        setActiveTip(tip)
        setIsVisible(true)
        
        // Auto-hide after 8 seconds
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, 8000)
        
        return () => clearTimeout(timer)
      }
    }
  }, [trigger, dismissedTips])

  const dismissTip = (tipId: string, permanent = false) => {
    setIsVisible(false)
    
    if (permanent) {
      const newDismissed = [...dismissedTips, tipId]
      setDismissedTips(newDismissed)
      localStorage.setItem('saintvision-dismissed-tips', JSON.stringify(newDismissed))
    }
  }

  const showSmartSuggestion = () => {
    // Show contextual suggestions based on user behavior
    const suggestions = [
      "Try asking: 'Help me create a business plan'",
      "Upload a document and ask me to analyze it",
      "Use voice commands for hands-free interaction",
      "Ask about enterprise features for your team"
    ]
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    return randomSuggestion
  }

  if (!isVisible || !activeTip) return null

  return (
    <div 
      className="fixed z-40 animate-in fade-in slide-in-from-bottom-2 duration-300"
      style={{
        top: position?.y ? `${position.y}px` : 'auto',
        left: position?.x ? `${position.x}px` : 'auto',
        bottom: !position?.y ? '100px' : 'auto',
        right: !position?.x ? '20px' : 'auto'
      }}
    >
      <div className="bg-gray-900 border border-yellow-500/50 rounded-lg p-4 max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-white">{activeTip.title}</h3>
          </div>
          <button
            onClick={() => dismissTip(activeTip.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-300 text-sm mb-3">{activeTip.content}</p>

        {/* Smart Suggestion */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2 mb-3">
          <p className="text-yellow-400 text-xs">💡 {showSmartSuggestion()}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => dismissTip(activeTip.id, true)}
            className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            Don't show again
          </button>
          <button
            onClick={() => dismissTip(activeTip.id)}
            className="px-3 py-1 bg-yellow-500 text-black text-xs font-medium rounded hover:bg-yellow-400 transition-colors"
          >
            Got it
          </button>
        </div>

        {/* Founder Indicator */}
        {session?.user?.isFounder && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 text-xs">👑</span>
              <span className="text-yellow-500 text-xs font-medium">Founder Mode Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Hook for triggering contextual help
export function useContextualHelp() {
  const [trigger, setTrigger] = useState<string | null>(null)

  const showHelp = (helpId: string, position?: { x: number; y: number }) => {
    setTrigger(helpId)
    setTimeout(() => setTrigger(null), 100) // Reset after triggering
  }

  return { trigger, showHelp }
}