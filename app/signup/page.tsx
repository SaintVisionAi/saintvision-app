'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // TEMPORARY: Simulate signup and redirect to PRO dashboard
    // TODO: Implement real authentication with plan detection
    setTimeout(() => {
      // For now, all new signups get PRO access
      router.push('/pro')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logos/GOTTAGUY.png"
            alt="SAINTVISIONAI"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-light tracking-wider text-white mb-2">
            Join SAINTVISIONAI
          </h1>
          <p className="text-sm text-gray-500">
            Start your intelligence journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm"
            required
          />
          
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm"
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none backdrop-blur-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Get Started Free'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?
          <button
            onClick={() => router.push('/signin')}
            className="ml-2 text-yellow-500 hover:text-yellow-400"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
