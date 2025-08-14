'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-gray-900/10" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">SV</span>
            </div>
            <span className="text-xl font-bold">SAINTVISION<span className="text-yellow-500">AI</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => router.push('/demo')} className="text-gray-400 hover:text-white">Live Demo</button>
            <button onClick={() => router.push('/pricing')} className="text-gray-400 hover:text-white">Pricing</button>
            <button onClick={() => router.push('/login')} className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400">
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* HACP Badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-8">
              <span className="text-yellow-500 text-sm font-semibold">HACP™ PROTECTED</span>
              <span className="text-gray-400 text-sm">Human-AI Connection Protocol</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Enterprise AI That
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Actually Delivers
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              SAINT SAL™ - The world's first AI system with genuine business intelligence. 
              Powered by dual AI architecture (GPT-5 + Claude Opus), delivering 10x productivity gains.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  setIsLoading(true)
                  router.push('/demo')
                }}
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition"
              >
                See Live Demo
              </button>
              <button 
                onClick={() => router.push('/workspace')}
                className="px-8 py-4 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Try Workspace
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
