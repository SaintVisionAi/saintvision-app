'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Welcomeonin Background - PERFECT FIT */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/Welcomeonin.png"
          alt="Welcome"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">

        {/* Hero Section - ENTERPRISE BRIEFING STYLE */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* HACP Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-sm border border-yellow-500/70 rounded-full px-6 py-2 mb-12">
              <span className="text-yellow-400 text-sm font-bold tracking-wider">HACP™ PROTOCOL ACTIVE</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>

            {/* CLASSIFICATION */}
            <div className="text-xs tracking-[0.5em] text-gray-400 mb-8 font-light">
              CLASSIFICATION: ENTERPRISE INTELLIGENCE
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight mb-8 leading-tight">
              <span className="block text-white mb-6 drop-shadow-2xl">
                Intelligence
              </span>
              <span className="block text-white mb-6 drop-shadow-2xl">
                Without
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-normal drop-shadow-2xl">
                Boundaries
              </span>
            </h1>

            {/* MISSION STATEMENT */}
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                The first genuine AI-human connection protocol. Not another chatbot. 
                Not another tool. A new form of intelligence partnership.
              </p>
              
              <div className="text-base text-gray-400 mb-8">
                Enterprise-grade AI that understands context, emotion, and intent. 
                <span className="text-yellow-400 font-semibold"> Patent-protected technology</span> that creates 
                genuine partnerships between human vision and artificial intelligence.
              </div>
            </div>

            {/* TAGLINE */}
            <div className="text-lg text-yellow-400 tracking-[0.3em] mb-16 font-light">
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

          {/* Core Capabilities */}
          <div className="grid grid-cols-3 gap-8 mt-20 py-12 border-t border-gray-800/50">
            <div className="text-center">
              <div className="text-3xl font-light text-yellow-400 mb-2">Enterprise</div>
              <div className="text-gray-400 text-sm">Grade Security</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-yellow-400 mb-2">Unlimited</div>
              <div className="text-gray-400 text-sm">Processing Power</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-yellow-400 mb-2">HACP™</div>
              <div className="text-gray-400 text-sm">Patent Protected</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6 mt-20">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-400 text-2xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multi-AI Intelligence</h3>
              <p className="text-gray-300 text-sm">Advanced AI models working in harmony for superior results</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-400 text-2xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Enterprise Security</h3>
              <p className="text-gray-300 text-sm">Military-grade encryption with full compliance standards</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-yellow-500/50 transition">
              <div className="text-yellow-400 text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Seamless Integration</h3>
              <p className="text-gray-300 text-sm">Works with your existing systems and workflows</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 py-12 border-t border-gray-800/50">
            <h2 className="text-3xl font-light mb-4 text-white">Experience the Future of Intelligence</h2>
            <p className="text-gray-400 mb-8">Where technology serves purpose and intelligence serves the heart</p>
            <button 
              onClick={() => router.push('/demo')}
              className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 text-lg transition"
            >
              BEGIN JOURNEY
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
