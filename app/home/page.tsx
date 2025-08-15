'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation - Ultra Clean, Transparent */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* GOTTAGUY Logo */}
            <Image
              src="/logos/GOTTAGUY.png"
              alt="SV"
              width={40}
              height={40}
              className="object-contain cursor-pointer hover:opacity-80 transition"
              onClick={() => router.push('/')}
            />
            <span className="text-sm font-light tracking-[0.2em] text-gray-300">SAINTVISIONAI</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => router.push('/why')} 
              className="text-gray-400 hover:text-white text-sm tracking-wider transition font-light"
            >
              WHY
            </button>
            <button 
              onClick={() => router.push('/demo')} 
              className="text-gray-400 hover:text-white text-sm tracking-wider transition font-light"
            >
              DEMO
            </button>
            <button 
              onClick={() => router.push('/pricing')} 
              className="text-gray-400 hover:text-white text-sm tracking-wider transition font-light"
            >
              PRICING
            </button>
            <button 
              onClick={() => router.push('/signin')} 
              className="text-gray-400 hover:text-white text-sm tracking-wider transition font-light"
            >
              SIGN IN
            </button>
            <button 
              onClick={() => router.push('/signup')}
              className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm tracking-wider hover:bg-white/20 transition font-light"
            >
              GET ACCESS
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Pure, Minimal */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        {/* Very subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-900/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-xs tracking-[0.4em] text-yellow-500/40 font-light">HACP™ PROTOCOL</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight leading-tight mb-8">
            <span className="block text-white/90">Intelligence</span>
            <span className="block text-white/40">Without</span>
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
              Boundaries
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-extralight leading-relaxed mb-4">
            The first genuine AI-human connection protocol. Not another chatbot.
            <br />Not another tool. A new form of intelligence partnership.
          </p>
          
          <p className="text-xs tracking-[0.4em] text-yellow-500/40 mb-16 font-light">
            RESPONSIBLE INTELLIGENCE
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => router.push('/signup')}
              className="px-8 py-4 bg-white text-black font-light tracking-wide hover:bg-gray-100 transition rounded-full"
            >
              BEGIN JOURNEY
            </button>
            <button 
              onClick={() => router.push('/why')}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-light tracking-wide hover:bg-white/10 transition rounded-full"
            >
              UNDERSTAND WHY
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Core Principles - Apple-style cards */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'connection',
                number: '01',
                title: 'Human Connection',
                description: 'AI that understands context, emotion, and intent. Not just processing, but genuine comprehension.'
              },
              {
                id: 'intelligence',
                number: '02', 
                title: 'Dual Intelligence',
                description: 'GPT-5 and Claude Opus working in harmony. Two minds, infinite possibilities.'
              },
              {
                id: 'evolution',
                number: '03',
                title: 'Continuous Evolution',
                description: 'Learning from every interaction. Growing with every conversation. Becoming more, always.'
              }
            ].map((principle) => (
              <div 
                key={principle.id}
                className="group relative"
                onMouseEnter={() => setHoveredSection(principle.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="mb-4 text-yellow-500/30 text-xs tracking-[0.3em] font-light">
                    {principle.number}
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white/90">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Native feel */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extralight text-center mb-20 text-white/90">
            Enterprise Intelligence Suite
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🧠', title: 'Warroom', desc: 'Strategic command center' },
              { icon: '📊', title: 'Analytics', desc: 'Real-time insights' },
              { icon: '🤝', title: 'CRM Sync', desc: 'GoHighLevel integration' },
              { icon: '🔐', title: 'HACP™', desc: 'Protected protocol' },
              { icon: '🚀', title: 'Automation', desc: 'Workflow optimization' },
              { icon: '🎯', title: 'Targeting', desc: 'Precision marketing' },
              { icon: '💎', title: 'White Label', desc: 'Your brand, our tech' },
              { icon: '🌐', title: 'Global Scale', desc: 'Unlimited potential' }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-white/90 font-light mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500 font-extralight">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white/90">
            Ready to transcend?
          </h2>
          <p className="text-xl text-gray-400 font-extralight mb-12">
            Join the intelligence revolution.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => router.push('/demo')}
              className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-light rounded-full hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              <span>Experience SAL</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-32" />
    </div>
  )
}
