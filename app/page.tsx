'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* FUTURESV Background - FIXED PARALLAX */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/backgrounds/FUTURESV.png"
          alt="Future SV Background"
          fill
          className="object-contain opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>
      
      {/* Main Content - Scrollable over fixed background */}
      <div className="relative z-10 min-h-screen">

        {/* $10M ENTERPRISE HERO SECTION */}
        <div className="max-w-8xl mx-auto px-8 py-20">
          
          {/* Status Indicators */}
          <div className={`flex justify-center items-center space-x-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium tracking-wide">SYSTEMS OPERATIONAL</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 text-xs font-medium tracking-wide">HACP™ PROTOCOL ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-xs font-medium tracking-wide">AI MODELS SYNCHRONIZED</span>
            </div>
          </div>

          <div className="text-center max-w-6xl mx-auto">
            
            {/* Enterprise Classification */}
            <div className={`text-sm tracking-[0.5em] text-white mb-8 font-medium transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              ENTERPRISE AI INTELLIGENCE PLATFORM
            </div>

            {/* Main Headline - Responsible Intelligence */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extralight mb-20 leading-[1.4] transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="block mb-8">
                <span className="text-white font-thin">Responsible</span>
              </div>
              <div className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-normal pb-4">
                Intelligence
              </div>
            </h1>

            {/* Powerful Subheading */}
            <div className={`max-w-5xl mx-auto mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8" style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
              }}>
                The first AI platform that <span className="text-yellow-400" style={{
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
                }}>thinks</span>, <span className="text-blue-400" style={{
                  textShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
                }}>learns</span>, and <span className="text-green-400" style={{
                  textShadow: '0 0 15px rgba(34, 197, 94, 0.6)',
                  filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))'
                }}>evolves</span> with your business
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed max-w-4xl mx-auto" style={{
                textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
              }}>
                Deploy enterprise-grade AI agents in minutes. Scale from startup to Fortune 500. 
                <span className="text-yellow-400 font-medium" style={{
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                }}> Patented technology</span> that adapts to your unique workflows and objectives.
              </p>
            </div>

            {/* Value Proposition */}
            <div className={`text-lg text-yellow-400 tracking-[0.2em] mb-16 font-light transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)',
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))'
            }}>
              WHERE <span className="text-blue-400" style={{
                textShadow: '0 0 15px rgba(59, 130, 246, 0.6)'
              }}>INNOVATION</span> MEETS <span className="text-green-400" style={{
                textShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
              }}>INTELLIGENCE</span>
            </div>

            {/* Enterprise CTA Buttons */}
            <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button 
                onClick={() => {
                  setIsLoading(true)
                  router.push('/playground')
                }}
                className="group relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-500/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Launch Playground</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={() => router.push('/demo')}
                className="group px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <button 
                onClick={() => router.push('/pricing')}
                className="px-6 py-2 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg transition-colors text-sm"
              >
                View Pricing
              </button>
            </div>
          </div>

          {/* Enterprise Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-gray-800/30">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-light text-yellow-400 mb-3 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-400 text-sm font-medium">Uptime SLA</div>
              <div className="text-gray-600 text-xs mt-1">Enterprise Grade</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-light text-blue-400 mb-3 group-hover:scale-110 transition-transform">&lt;100ms</div>
              <div className="text-gray-400 text-sm font-medium">Response Time</div>
              <div className="text-gray-600 text-xs mt-1">Global Edge Network</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-light text-green-400 mb-3 group-hover:scale-110 transition-transform">SOC 2</div>
              <div className="text-gray-400 text-sm font-medium">Type II Certified</div>
              <div className="text-gray-600 text-xs mt-1">Bank-Grade Security</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-light text-purple-400 mb-3 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-400 text-sm font-medium">Expert Support</div>
              <div className="text-gray-600 text-xs mt-1">Dedicated Success Team</div>
            </div>
          </div>

          {/* Enterprise AI Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="group bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-yellow-400 transition-colors">Adaptive Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                AI agents that learn from every interaction, continuously improving their understanding of your business context and decision-making patterns.
              </p>
              <div className="text-xs text-yellow-400 font-medium">HACP™ Protocol</div>
            </div>

            <div className="group bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">Instant Deployment</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Deploy enterprise-ready AI solutions in under 5 minutes. No infrastructure setup, no model training, no technical expertise required.
              </p>
              <div className="text-xs text-blue-400 font-medium">Zero-Configuration</div>
            </div>

            <div className="group bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-green-400 transition-colors">Enterprise Security</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Military-grade encryption, SOC 2 compliance, and zero-trust architecture. Your data never leaves your control.
              </p>
              <div className="text-xs text-green-400 font-medium">Bank-Grade Protection</div>
            </div>
          </div>

          {/* Enterprise CTA Section */}
          <div className="text-center mt-32 py-20 border-t border-gray-800/30 bg-gradient-to-br from-black/50 to-gray-900/30 backdrop-blur-sm rounded-3xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Join industry leaders who've accelerated their growth with SaintVision AI. 
                Start your enterprise AI transformation today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <button 
                  onClick={() => {
                    setIsLoading(true)
                    router.push('/playground')
                  }}
                  className="group relative px-12 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-500/25 text-lg"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Start Free Trial</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <button 
                  onClick={() => router.push('/demo')}
                  className="px-12 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-lg"
                >
                  Schedule Demo
                </button>
              </div>

              <div className="text-sm text-gray-500">
                No credit card required • Enterprise support included • SOC 2 compliant
              </div>
            </div>
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
