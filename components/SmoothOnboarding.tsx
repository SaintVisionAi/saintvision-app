'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  action?: string
  icon: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SaintVisionAI™',
    description: 'Your HACP™ protected AI assistant is ready to help you achieve extraordinary results.',
    icon: '👋'
  },
  {
    id: 'voice',
    title: 'Try Voice Commands',
    description: 'Click the microphone to speak naturally - I understand context and intent.',
    action: 'Try saying: "Help me analyze my business goals"',
    icon: '🎤'
  },
  {
    id: 'files',
    title: 'Share Documents',
    description: 'Drag and drop files for instant analysis - PDFs, images, spreadsheets.',
    action: 'Click the paperclip icon to upload',
    icon: '📎'
  },
  {
    id: 'memory',
    title: 'Persistent Memory',
    description: 'I remember our conversations and learn your preferences over time.',
    icon: '🧠'
  },
  {
    id: 'enterprise',
    title: 'Enterprise Features',
    description: 'Unlock advanced integrations, unlimited usage, and dedicated support.',
    action: 'Upgrade when ready',
    icon: '🚀'
  }
]

interface SmoothOnboardingProps {
  onComplete: () => void
}

export default function SmoothOnboarding({ onComplete }: SmoothOnboardingProps) {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem('saintvision-onboarding-complete')
    if (seen) {
      setHasSeenOnboarding(true)
      setIsVisible(false)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    localStorage.setItem('saintvision-onboarding-complete', 'true')
    setIsVisible(false)
    onComplete()
  }

  if (!isVisible || hasSeenOnboarding) return null

  const step = ONBOARDING_STEPS[currentStep]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-yellow-500/30 max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Step {currentStep + 1} of {ONBOARDING_STEPS.length}</span>
            <span>{Math.round(((currentStep + 1) / ONBOARDING_STEPS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4 animate-bounce">{step.icon}</div>
          <h2 className="text-xl font-bold text-white mb-3">{step.title}</h2>
          <p className="text-gray-300 mb-4">{step.description}</p>
          
          {step.action && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <p className="text-yellow-400 text-sm font-medium">💡 {step.action}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Skip Tour
          </button>
          
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg text-sm transition-colors"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>

        {/* Founder Badge */}
        {session?.user?.isFounder && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
              <span className="text-yellow-500 text-xs font-semibold">👑 FOUNDER ACCESS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}