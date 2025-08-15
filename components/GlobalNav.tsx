'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function GlobalNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname === '/splash') return null

  const isAuthenticated = pathname.includes('/dashboard') || pathname.includes('/warroom') || pathname.includes('/pro')

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            onClick={() => router.push(isAuthenticated ? '/dashboard' : '/home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <Image
              src="/logos/GOTTAGUY.png"
              alt="SAINTVISIONAI"
              width={36}
              height={36}
              className="object-contain group-hover:opacity-80 transition"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-light tracking-[0.2em] text-white/80">SAINTVISIONAI</div>
              <div className="text-xs text-yellow-500/40 tracking-[0.3em]">INTELLIGENCE</div>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <button onClick={() => router.push('/why')} className="text-white/60 hover:text-white text-sm font-light transition hidden sm:block">
                Why
              </button>
              <button onClick={() => router.push('/institute')} className="text-white/60 hover:text-white text-sm font-light transition hidden sm:block">
                Institute
              </button>
              <button onClick={() => router.push('/pricing')} className="text-white/60 hover:text-white text-sm font-light transition hidden sm:block">
                Pricing
              </button>
              <button onClick={() => router.push('/demo')} className="text-white/60 hover:text-white text-sm font-light transition">
                Demo
              </button>
              <button onClick={() => router.push('/signin')} className="text-white/60 hover:text-white text-sm font-light transition">
                Sign In
              </button>
              <button 
                onClick={() => router.push('/signup')}
                className="px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-light hover:bg-white/20 transition"
              >
                Get Started
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <button onClick={() => router.push('/dashboard')} className="text-white/60 hover:text-white text-sm font-light transition">
                Dashboard
              </button>
              <button onClick={() => router.push('/warroom')} className="text-white/60 hover:text-white text-sm font-light transition">
                Warroom
              </button>
              <button onClick={() => router.push('/pro')} className="text-white/60 hover:text-white text-sm font-light transition">
                Pro
              </button>
              <button onClick={() => router.push('/tools')} className="text-white/60 hover:text-white text-sm font-light transition">
                Tools
              </button>
              <div className="relative group">
                <button className="text-white/60 hover:text-white text-sm font-light transition flex items-center space-x-1">
                  <span>Upgrade</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => router.push('/pricing')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    Pro Plan
                  </button>
                  <button onClick={() => router.push('/enterprise')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    Enterprise
                  </button>
                  <button onClick={() => router.push('/white-label')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    White Label
                  </button>
                </div>
              </div>
              <button onClick={() => router.push('/help')} className="text-white/60 hover:text-white text-sm font-light transition">
                Help
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full cursor-pointer hover:opacity-80 transition" />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
