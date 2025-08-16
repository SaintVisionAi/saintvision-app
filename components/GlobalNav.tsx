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
            onClick={() => router.push(isAuthenticated ? '/dashboard' : '/')}
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
            <div className="flex items-center space-x-8">
              {/* Enterprise Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <button onClick={() => router.push('/playground')} className="text-white/70 hover:text-yellow-400 text-sm font-medium transition hover:scale-105">
                  Playground
                </button>
                <button onClick={() => router.push('/agents')} className="text-white/70 hover:text-blue-400 text-sm font-medium transition hover:scale-105">
                  Agents
                </button>
                <button onClick={() => router.push('/why')} className="text-white/70 hover:text-green-400 text-sm font-medium transition hover:scale-105">
                  Why
                </button>
                <button onClick={() => router.push('/pricing')} className="text-white/70 hover:text-purple-400 text-sm font-medium transition hover:scale-105">
                  Pricing
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <button onClick={() => router.push('/demo')} className="text-white/60 hover:text-white text-sm font-medium transition">
                  Demo
                </button>
                <button onClick={() => router.push('/signin')} className="text-white/60 hover:text-white text-sm font-medium transition">
                  Sign In
                </button>
                <button 
                  onClick={() => router.push('/playground')}
                  className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
                >
                  Start Free
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              {/* Enterprise User Navigation */}
              <button onClick={() => router.push('/dashboard')} className="text-white/70 hover:text-yellow-400 text-sm font-medium transition hover:scale-105 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </button>
              
              <button onClick={() => router.push('/playground')} className="text-white/70 hover:text-blue-400 text-sm font-medium transition hover:scale-105 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Playground</span>
              </button>
              
              <button onClick={() => router.push('/agents')} className="text-white/70 hover:text-green-400 text-sm font-medium transition hover:scale-105 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Agents</span>
              </button>
              
              <button onClick={() => router.push('/warroom')} className="text-white/70 hover:text-purple-400 text-sm font-medium transition hover:scale-105 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>SAL AI</span>
              </button>

              {/* User Profile */}
              <div className="relative group">
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full cursor-pointer hover:opacity-80 transition flex items-center justify-center">
                  <span className="text-black text-sm font-bold">U</span>
                </div>
                <div className="absolute top-full right-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => router.push('/profile')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    Profile Settings
                  </button>
                  <button onClick={() => router.push('/billing')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    Billing & Usage
                  </button>
                  <button onClick={() => router.push('/pricing')} className="block w-full text-left px-4 py-3 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-white/10 transition">
                    Upgrade Plan
                  </button>
                  <hr className="border-white/10 my-2" />
                  <button onClick={() => router.push('/help')} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                    Help & Support
                  </button>
                  <button onClick={() => router.push('/signin')} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
