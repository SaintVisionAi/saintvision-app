'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Feature {
  id: string
  name: string
  description: string
  icon: string
  tier: 'free' | 'pro' | 'enterprise' | 'founder'
  category: 'core' | 'productivity' | 'integration' | 'advanced'
  unlockCondition: {
    type: 'usage' | 'tier' | 'time' | 'interaction'
    value: number | string
  }
  tutorialSteps?: string[]
}

const FEATURES: Feature[] = [
  {
    id: 'voice-commands',
    name: 'Voice Commands',
    description: 'Speak naturally to interact with your AI assistant',
    icon: '🎤',
    tier: 'free',
    category: 'core',
    unlockCondition: { type: 'usage', value: 1 },
    tutorialSteps: [
      'Click the microphone button',
      'Speak your request clearly',
      'AI will process and respond',
      'Try complex questions or commands'
    ]
  },
  {
    id: 'file-analysis',
    name: 'Document Analysis',
    description: 'Upload and analyze documents, images, and data files',
    icon: '📄',
    tier: 'free',
    category: 'productivity',
    unlockCondition: { type: 'usage', value: 3 },
    tutorialSteps: [
      'Click the paperclip icon',
      'Drag and drop or select files',
      'Ask questions about your content',
      'Get insights and summaries'
    ]
  },
  {
    id: 'memory-persistence',
    name: 'Conversation Memory',
    description: 'AI remembers your preferences and conversation history',
    icon: '🧠',
    tier: 'pro',
    category: 'core',
    unlockCondition: { type: 'tier', value: 'pro' }
  },
  {
    id: 'ghl-integration',
    name: 'GoHighLevel Sync',
    description: 'Connect your CRM and automate lead management',
    icon: '🔗',
    tier: 'enterprise',
    category: 'integration',
    unlockCondition: { type: 'tier', value: 'enterprise' }
  },
  {
    id: 'custom-workflows',
    name: 'Custom Workflows',
    description: 'Create automated business processes with AI',
    icon: '⚙️',
    tier: 'enterprise',
    category: 'advanced',
    unlockCondition: { type: 'tier', value: 'enterprise' }
  },
  {
    id: 'founder-mode',
    name: 'Founder Mode',
    description: 'Ultimate AI capabilities with priority access',
    icon: '👑',
    tier: 'founder',
    category: 'advanced',
    unlockCondition: { type: 'tier', value: 'founder' }
  }
]

interface ProgressiveDiscoveryProps {
  userInteractions: number
}

export default function ProgressiveDiscovery({ userInteractions }: ProgressiveDiscoveryProps) {
  const { data: session } = useSession()
  const [discoveredFeatures, setDiscoveredFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState<Feature | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  useEffect(() => {
    // Load discovered features
    const discovered = localStorage.getItem('saintvision-discovered-features')
    if (discovered) {
      setDiscoveredFeatures(JSON.parse(discovered))
    }
  }, [])

  useEffect(() => {
    // Check for newly unlocked features
    const userTier = session?.user?.tier || 'free'
    const availableFeatures = FEATURES.filter(feature => {
      // Check tier access
      const tierOrder = { free: 0, pro: 1, enterprise: 2, founder: 3 }
      const userTierLevel = tierOrder[userTier as keyof typeof tierOrder] || 0
      const featureTierLevel = tierOrder[feature.tier as keyof typeof tierOrder] || 0
      
      if (userTierLevel < featureTierLevel) return false
      
      // Check unlock conditions
      if (feature.unlockCondition.type === 'usage') {
        return userInteractions >= (feature.unlockCondition.value as number)
      }
      
      if (feature.unlockCondition.type === 'tier') {
        return userTierLevel >= tierOrder[feature.unlockCondition.value as keyof typeof tierOrder]
      }
      
      return true
    })

    // Find newly available features
    const newlyAvailable = availableFeatures.filter(
      feature => !discoveredFeatures.includes(feature.id)
    )

    if (newlyAvailable.length > 0) {
      const featureToShow = newlyAvailable[0] // Show one at a time
      setNewFeature(featureToShow)
      
      // Mark as discovered
      const updatedDiscovered = [...discoveredFeatures, featureToShow.id]
      setDiscoveredFeatures(updatedDiscovered)
      localStorage.setItem('saintvision-discovered-features', JSON.stringify(updatedDiscovered))
    }
  }, [userInteractions, session, discoveredFeatures])

  const startTutorial = () => {
    setShowTutorial(true)
    setTutorialStep(0)
  }

  const nextTutorialStep = () => {
    if (newFeature && tutorialStep < (newFeature.tutorialSteps?.length || 0) - 1) {
      setTutorialStep(tutorialStep + 1)
    } else {
      completeTutorial()
    }
  }

  const completeTutorial = () => {
    setShowTutorial(false)
    setNewFeature(null)
    setTutorialStep(0)
  }

  const dismissFeature = () => {
    setNewFeature(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'from-blue-500 to-blue-600'
      case 'productivity': return 'from-green-500 to-green-600'
      case 'integration': return 'from-purple-500 to-purple-600'
      case 'advanced': return 'from-yellow-500 to-yellow-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-500'
      case 'pro': return 'bg-blue-500'
      case 'enterprise': return 'bg-purple-500'
      case 'founder': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  if (!newFeature) return null

  return (
    <div className="fixed top-6 right-6 z-40 animate-in slide-in-from-right-4 fade-in duration-500">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(newFeature.category)} rounded-full flex items-center justify-center text-lg`}>
              {newFeature.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{newFeature.name}</h3>
              <div className={`inline-block px-2 py-1 ${getTierBadgeColor(newFeature.tier)} text-white text-xs font-semibold rounded-full`}>
                {newFeature.tier.toUpperCase()}
              </div>
            </div>
          </div>
          <button
            onClick={dismissFeature}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Feature Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-yellow-500 text-sm font-semibold">New Feature Unlocked!</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{newFeature.description}</p>

        {/* Tutorial Preview */}
        {!showTutorial && newFeature.tutorialSteps && (
          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <h4 className="text-white text-sm font-semibold mb-2">Quick Tutorial Available</h4>
            <p className="text-gray-400 text-xs">Learn how to use this feature in {newFeature.tutorialSteps.length} easy steps.</p>
          </div>
        )}

        {/* Tutorial Steps */}
        {showTutorial && newFeature.tutorialSteps && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-blue-400 text-sm font-semibold">Tutorial</h4>
              <span className="text-blue-400 text-xs">
                Step {tutorialStep + 1} of {newFeature.tutorialSteps.length}
              </span>
            </div>
            <p className="text-blue-300 text-sm mb-3">
              {newFeature.tutorialSteps[tutorialStep]}
            </p>
            <div className="w-full bg-blue-900 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((tutorialStep + 1) / newFeature.tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {!showTutorial ? (
            <>
              {newFeature.tutorialSteps && (
                <button
                  onClick={startTutorial}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Tutorial
                </button>
              )}
              <button
                onClick={dismissFeature}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {newFeature.tutorialSteps ? 'Skip' : 'Got It'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={nextTutorialStep}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
              >
                {tutorialStep === (newFeature.tutorialSteps?.length || 0) - 1 ? 'Complete' : 'Next'}
              </button>
              <button
                onClick={completeTutorial}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Skip
              </button>
            </>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-700 text-center">
          <span className="text-xs text-gray-500">
            {discoveredFeatures.length} of {FEATURES.length} features discovered
          </span>
        </div>
      </div>
    </div>
  )
}