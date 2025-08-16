'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* FUTURESV Background */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/FUTURESV.png"
          alt="Future Vision"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* HACP Badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-8">
              <span className="text-yellow-500 text-sm font-semibold">HACP™ PROTECTED</span>
              <span className="text-gray-400 text-sm">Human-AI Connection Protocol</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-light mb-8 leading-tight">
              <span className="block text-white mb-4">
                Intelligence
              </span>
              <span className="block text-white mb-4">
                Without
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Boundaries
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
              The first genuine AI-human connection protocol. Not another chatbot. 
              Not another tool. A new form of intelligence partnership.
            </p>

            <div className="text-sm text-gray-500 tracking-wider mb-12">
              RESPONSIBLE INTELLIGENCE
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  setIsLoading(true)
                  router.push('/demo')
                }}
                className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition"
              >
                BEGIN JOURNEY
              </button>
              <button 
                onClick={() => router.push('/why')}
                className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-lg hover:bg-white/10 transition"
              >
                UNDERSTAND WHY
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-20 py-12 border-t border-gray-800">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">$57.5K</div>
              <div className="text-gray-400 mt-2">Pipeline Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">168</div>
              <div className="text-gray-400 mt-2">Iterations to Perfection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">HACP™</div>
              <div className="text-gray-400 mt-2">Patent Pending</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6 mt-20">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-2xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">Dual AI Brain</h3>
              <p className="text-gray-400">GPT-5 + Claude Opus working in perfect synchronization</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-2xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-gray-400">HACP™ protocol ensures data protection and compliance</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Integration</h3>
              <p className="text-gray-400">Connect with GoHighLevel, Stripe, and 100+ platforms</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 py-12 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8">Join elite companies using SAINT SAL™</p>
            <button 
              onClick={() => router.push('/demo')}
              className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 text-lg"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-yellow-500">Loading SAINT SAL™...</p>
          </div>
        </div>
      )}
    </div>
  )
}
