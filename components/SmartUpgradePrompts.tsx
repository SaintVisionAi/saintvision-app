'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface UpgradePrompt {
  id: string
  trigger: 'usage_limit' | 'feature_request' | 'value_demonstration' | 'timing_based'
  title: string
  description: string
  benefits: string[]
  cta: string
  timing: number // minutes since trigger
  priority: number
}

const UPGRADE_PROMPTS: UpgradePrompt[] = [
  {
    id: 'value-demo',
    trigger: 'value_demonstration',
    title: 'Unlock Your Full Potential',
    description: 'You\'ve been getting great results! Imagine what you could accomplish with unlimited access.',
    benefits: [
      'Unlimited conversations and AI requests',
      'Priority processing and faster responses',
      'Advanced integrations with your business tools',
      'Dedicated enterprise support'
    ],
    cta: 'See Enterprise Features',
    timing: 0,
    priority: 1
  },
  {
    id: 'gentle-limit',
    trigger: 'usage_limit',
    title: 'You\'re Making Great Progress!',
    description: 'You\'re approaching your monthly limit. Keep the momentum going with unlimited access.',
    benefits: [
      'Never hit usage limits again',
      'Continue important conversations',
      'Access to voice and file features',
      'Enterprise-grade reliability'
    ],
    cta: 'Upgrade to Continue',
    timing: 5,
    priority: 2
  },
  {
    id: 'feature-unlock',
    trigger: 'feature_request',
    title: 'This Feature is Available in Pro',
    description: 'The advanced capability you\'re looking for is included in our Pro and Enterprise plans.',
    benefits: [
      'Access to this feature immediately',
      'All premium AI capabilities',
      'Enhanced productivity tools',
      '24/7 priority support'
    ],
    cta: 'Unlock Now',
    timing: 0,
    priority: 3
  }
]

interface SmartUpgradePromptsProps {
  trigger?: string
  context?: any
}

export default function SmartUpgradePrompts({ trigger, context }: SmartUpgradePromptsProps) {
  const { data: session } = useSession()
  const [activePrompt, setActivePrompt] = useState<UpgradePrompt | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [userInteractions, setUserInteractions] = useState(0)
  const [lastShown, setLastShown] = useState<Date | null>(null)

  useEffect(() => {
    // Track user interactions
    const interactions = localStorage.getItem('saintvision-interactions')
    if (interactions) {
      setUserInteractions(parseInt(interactions))
    }

    const lastShownStr = localStorage.getItem('saintvision-last-upgrade-prompt')
    if (lastShownStr) {
      setLastShown(new Date(lastShownStr))
    }
  }, [])

  useEffect(() => {
    if (session?.user?.tier === 'free' && shouldShowPrompt()) {
      const prompt = selectBestPrompt()
      if (prompt) {
        showPromptWithDelay(prompt)
      }
    }
  }, [trigger, userInteractions, session])

  const shouldShowPrompt = (): boolean => {
    // Don't show if user is already pro/enterprise
    if (session?.user?.tier !== 'free') return false

    // Don't show too frequently (max once per day)
    if (lastShown && new Date().getTime() - lastShown.getTime() < 24 * 60 * 60 * 1000) {
      return false
    }

    // Only show after user has had some positive interactions
    if (userInteractions < 3) return false

    return true
  }

  const selectBestPrompt = (): UpgradePrompt | null => {
    if (trigger === 'approaching_limit') {
      return UPGRADE_PROMPTS.find(p => p.trigger === 'usage_limit') || null
    }

    if (trigger === 'premium_feature_attempted') {
      return UPGRADE_PROMPTS.find(p => p.trigger === 'feature_request') || null
    }

    // Default to value demonstration after user has been active
    if (userInteractions >= 5) {
      return UPGRADE_PROMPTS.find(p => p.trigger === 'value_demonstration') || null
    }

    return null
  }

  const showPromptWithDelay = (prompt: UpgradePrompt) => {
    setTimeout(() => {
      setActivePrompt(prompt)
      setIsVisible(true)
      
      // Track that we showed a prompt
      localStorage.setItem('saintvision-last-upgrade-prompt', new Date().toISOString())
      
      // Auto-hide after 15 seconds if no interaction
      setTimeout(() => {
        setIsVisible(false)
      }, 15000)
    }, prompt.timing * 60 * 1000)
  }

  const handleUpgrade = () => {
    // Track positive interaction
    localStorage.setItem('saintvision-upgrade-interest', 'true')
    setIsVisible(false)
    
    // Redirect to pricing page
    window.location.href = '/pricing'
  }

  const handleDismiss = (type: 'later' | 'not_interested') => {
    setIsVisible(false)
    
    if (type === 'not_interested') {
      // Don't show upgrade prompts for a week
      const nextShow = new Date()
      nextShow.setDate(nextShow.getDate() + 7)
      localStorage.setItem('saintvision-last-upgrade-prompt', nextShow.toISOString())
    }
  }

  const incrementInteractions = () => {
    const newCount = userInteractions + 1
    setUserInteractions(newCount)
    localStorage.setItem('saintvision-interactions', newCount.toString())
  }

  // Call this from your main app when user has positive interactions
  useEffect(() => {
    const handleUserAction = () => incrementInteractions()
    
    // Listen for positive user actions
    window.addEventListener('saintvision-positive-interaction', handleUserAction)
    return () => window.removeEventListener('saintvision-positive-interaction', handleUserAction)
  }, [userInteractions])

  if (!isVisible || !activePrompt || session?.user?.tier !== 'free') return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/50 rounded-xl p-6 max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-yellow-500 text-sm">⭐</span>
            </div>
            <h3 className="text-lg font-bold text-white">{activePrompt.title}</h3>
          </div>
          <button
            onClick={() => handleDismiss('later')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{activePrompt.description}</p>

        {/* Benefits */}
        <div className="space-y-2 mb-4">
          {activePrompt.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
              <span className="text-gray-300 text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleUpgrade}
            className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105"
          >
            {activePrompt.cta}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleDismiss('later')}
              className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={() => handleDismiss('not_interested')}
              className="flex-1 px-3 py-2 text-gray-500 hover:text-gray-400 text-sm transition-colors"
            >
              Not Interested
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Usage: {userInteractions} interactions</span>
            <span className="text-yellow-500">Free Tier</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Utility function to trigger upgrade prompts
export const triggerUpgradePrompt = (type: string, context?: any) => {
  window.dispatchEvent(new CustomEvent('saintvision-upgrade-prompt', { 
    detail: { type, context } 
  }))
}

// Utility function to track positive interactions
export const trackPositiveInteraction = () => {
  window.dispatchEvent(new CustomEvent('saintvision-positive-interaction'))
}