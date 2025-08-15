'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PricingPage() {
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Get started with SAL',
      features: [
        '10 SAL conversations/day',
        'Basic analytics',
        'Email support',
        'Community access'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: billing === 'monthly' ? 97 : 970,
      description: 'For growing businesses',
      features: [
        'Unlimited SAL conversations',
        'Advanced analytics',
        'Priority support',
        'CRM integration',
        'Custom workflows',
        'API access'
      ],
      cta: 'Go Pro',
      popular: true
    },
    {
      name: 'Unlimited',
      price: billing === 'monthly' ? 297 : 2970,
      description: 'Scale without limits',
      features: [
        'Everything in Pro',
        'White-label options',
        'Dedicated account manager',
        'Custom AI training',
        'Advanced integrations',
        'SLA guarantee'
      ],
      cta: 'Go Unlimited',
      popular: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Built for your needs',
      features: [
        'Everything in Unlimited',
        'On-premise deployment',
        'Custom AI models',
        'Dedicated support team',
        'Security audit',
        'Compliance packages'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Image
              src="/logos/GOTTAGUY.png"
              alt="SAINTVISIONAI"
              width={80}
              height={80}
              className="mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-extralight mb-6">
              Simple, Transparent
              <span className="block text-yellow-500">Pricing</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              No hidden fees. No surprises. Just intelligence, unleashed.
            </p>

            <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-6 py-2 rounded-full transition ${
                  billing === 'monthly' 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={`px-6 py-2 rounded-full transition ${
                  billing === 'yearly' 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 border-2 border-yellow-500/50' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                  <div className="text-3xl font-light">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-yellow-500">${plan.price}</span>
                        <span className="text-sm text-gray-500">
                          /{billing === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </>
                    ) : (
                      <span className="text-yellow-500">{plan.price}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-2 text-sm">
                      <span className="text-yellow-500 mt-0.5">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => router.push(plan.name === 'Enterprise' ? '/contact' : '/signup')}
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.popular 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">All plans include:</p>
            <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-400">
              <span>✓ HACP™ Protocol</span>
              <span>✓ End-to-end encryption</span>
              <span>✓ 99.9% uptime</span>
              <span>✓ 30-day money back</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
