'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashPage() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 500)
    const timer = setTimeout(() => router.push('/home'), 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background - AI Lab Underground vibe */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/AI lab underground.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* HACP Badge */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1">
            <div className="w-2 h-2 bg-yellow-500/50 rounded-full animate-pulse" />
            <span className="text-xs tracking-[0.3em] text-gray-500 font-light">HACP™ PROTOCOL ACTIVE</span>
            <div className="w-2 h-2 bg-yellow-500/50 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Main Logo */}
        <div className="mb-8">
          <Image
            src="/logos/GOTTAGUY.png"
            alt="SAINTVISIONAI"
            width={300}
            height={150}
            className="mx-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="mb-4">
          <div className="text-6xl md:text-7xl font-thin tracking-wider">
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              SAINT
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              VISION
            </span>
          </div>
          <div className="text-xl md:text-2xl font-thin tracking-[0.5em] mt-4 text-gray-500">
            RESPONSIBLE INTELLIGENCE
          </div>
        </h1>

        {/* Enter Button */}
        <div className="mt-20">
          <button
            onClick={() => router.push('/home')}
            className="group relative inline-flex items-center"
          >
            <span className="text-gray-600 text-sm tracking-wider transition-colors group-hover:text-yellow-500">
              ENTER
            </span>
            <svg className="w-4 h-4 ml-2 text-gray-600 group-hover:text-yellow-500 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
