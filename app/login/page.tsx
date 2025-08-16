'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-xl">SV</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-yellow-500">SaintVisionAI</h1>
        <p className="text-center text-gray-400 mb-8">Powered by: SaintSal</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none mb-4"
        />
        <button
          onClick={() => email && router.push('/pro')}
          className="w-full py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-500"
        >
          Continue to PRO
        </button>
      </div>
    </div>
  )
}
