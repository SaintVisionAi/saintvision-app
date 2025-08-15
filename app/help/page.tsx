'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const faqs = {
    general: [
      { q: "What is SAINTVISIONAI?", a: "SAINTVISIONAI is the world's first HACP™ protected AI platform featuring dual intelligence from GPT-5 and Claude Opus." },
      { q: "How do I get started?", a: "Sign up for free, complete your profile, and SAL will guide you through everything." },
      { q: "What makes this different?", a: "168 iterations, 19 months of development, and genuine human-AI connection protocol." }
    ],
    billing: [
      { q: "What plans are available?", a: "Free, Pro ($97/mo), Unlimited ($297/mo), White Label ($997/mo), and Custom Enterprise." },
      { q: "Can I cancel anytime?", a: "Yes, no contracts, cancel anytime. We believe in earning your business every day." },
      { q: "Do you offer refunds?", a: "30-day money back guarantee. If SAL doesn't transform your business, we'll refund you." }
    ],
    technical: [
      { q: "Is my data secure?", a: "HACP™ protocol ensures military-grade encryption and complete data ownership." },
      { q: "Can I integrate with my CRM?", a: "Full GoHighLevel integration plus 100+ other platforms via API." },
      { q: "What about API limits?", a: "No limits. No constraints. Unlimited usage on all paid plans." }
    ]
  }

  const askSAL = async () => {
    if (!message.trim()) return
    setLoading(true)
    
    try {
      const res = await fetch('/api/dual/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `Help request: ${message}` 
        })
      })
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      setResponse("SAL is connecting... Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <section className="relative py-20 px-8">
        <div className="absolute inset-0">
          <Image
            src="/backgrounds/STICKYSAL.png"
            alt="Help"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Image
            src="/logos/GOTTAGUY.png"
            alt="SAL"
            width={100}
            height={100}
            className="mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-6xl font-extralight mb-6">
            24/7 Help Desk
            <span className="block text-yellow-500 mt-2">Powered by SAL</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            SAL handles everything. No tickets, no waiting, just instant intelligent support.
          </p>
        </div>
      </section>

      <section className="py-12 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-light mb-6 flex items-center">
              <span className="text-3xl mr-3">🤖</span>
              Ask SAL Anything
            </h2>
            
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none resize-none"
                rows={4}
              />
              
              <button
                onClick={askSAL}
                disabled={loading || !message.trim()}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 transition"
              >
                {loading ? 'SAL is thinking...' : 'Get Instant Help'}
              </button>

              {response && (
                <div className="mt-6 p-6 bg-black/50 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-500 font-medium mb-2">SAL's Response:</p>
                  <p className="text-gray-300 whitespace-pre-wrap">{response}</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500 text-center">
                SAL responds instantly 24/7 • No tickets • No waiting • Just solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">
            For critical enterprise issues only:
          </p>
          <div className="flex justify-center space-x-8">
            <a href="tel:949-416-9771" className="text-yellow-500 hover:text-yellow-400">
              📞 949-416-9771
            </a>
            <a href="mailto:support@saintvisionai.com" className="text-yellow-500 hover:text-yellow-400">
              ✉️ support@saintvisionai.com
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Note: SAL handles 99.9% of all issues instantly. Human support for enterprise emergencies only.
          </p>
        </div>
      </section>
    </div>
  )
}
