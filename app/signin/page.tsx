'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignInPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      router.push('/warroom')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center px-8 relative">
        {/* Background with Welcome */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/backgrounds/Welcomeonin.png"
            alt="Welcome"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/logos/GOTTAGUY.png"
              alt="SAINT VISION"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-light tracking-wider text-white mb-2">
              SaintVisionAI™
            </h1>
            <p className="text-sm text-gray-500 tracking-wider">
              Powered by: SaintSal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm transition"
              />
            )}
            
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm transition"
              required
            />

            {isSignUp && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm transition"
                required={isSignUp}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          {/* Toggle Sign In/Up */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-yellow-500 hover:text-yellow-400 transition"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-4 text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition flex items-center justify-center space-x-3 backdrop-blur-sm">
              <span>🔷</span>
              <span className="font-light">Continue with Google</span>
            </button>
            
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition flex items-center justify-center space-x-3 backdrop-blur-sm">
              <span>Ⓜ️</span>
              <span className="font-light">Continue with Microsoft</span>
            </button>
            
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition flex items-center justify-center space-x-3 backdrop-blur-sm">
              <span>🍎</span>
              <span className="font-light">Continue with Apple</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - HACP Explanation */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-8 bg-gradient-to-l from-yellow-900/5 to-transparent">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-xs tracking-wider text-yellow-500">HACP™ ACTIVE</span>
            </div>
            
            <h2 className="text-4xl font-light text-white mb-4">
              Welcome to the future of
              <span className="block text-yellow-500">Human-AI Connection</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { icon: '🔐', title: 'Protected Intelligence', desc: 'HACP™ protocol ensures your data and interactions remain secure, private, and under your control.' },
              { icon: '🧠', title: 'Dual AI Processing', desc: 'GPT-5 and Claude Opus work together, giving you unprecedented analytical power.' },
              { icon: '⚡', title: 'Instant Deployment', desc: 'From sign-up to full productivity in minutes. No setup, no learning curve.' },
              { icon: '🚀', title: 'Scale Without Limits', desc: 'Whether you\'re a solo founder or Fortune 500, SAINT SAL adapts and grows with you.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-500">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-light mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
