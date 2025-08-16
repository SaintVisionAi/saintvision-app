'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export default function WhyPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with warm background */}
      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* The BEST background ever - your amazing vision */}
        <div className="absolute inset-0">
          <Image
            src="/backgrounds/eyeontheprize.png"
            alt="Eye on the Prize"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
          <div className="mb-8">
            <span className="text-xs tracking-[0.4em] text-yellow-500/60 font-light">THE DIFFERENCE</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight mb-8">
            <span className="block">Why</span>
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
              SaintVision?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-extralight leading-relaxed mb-12">
            Because you deserve more than another AI tool. You deserve a partner who understands your vision, 
            amplifies your capabilities, and never stops evolving with you.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <span className="text-sm text-yellow-500">168 iterations</span>
            <span className="text-yellow-500/50">•</span>
            <span className="text-sm text-yellow-500">19 months</span>
            <span className="text-yellow-500/50">•</span>
            <span className="text-sm text-yellow-500">One vision</span>
          </div>
        </div>
      </section>

      {/* The REAL Story Section */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-8">
              The
              <span className="block text-yellow-500">Real Story</span>
            </h2>
            <p className="text-xl text-gray-400">Built from obsession, fueled by purpose</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="space-y-8">
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-2">19 Months</h3>
                  <p className="text-gray-400">
                    Every day. Every night. Building, testing, failing, learning. 
                    This wasn't a side project—this was life.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-2xl font-bold text-blue-500 mb-2">168 Builds</h3>
                  <p className="text-gray-400">
                    168 attempts. Each one teaching us something new about human-AI connection.
                    Each failure bringing us closer to perfection.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-2xl font-bold text-green-500 mb-2">2 Mac Minis + MacBook Pro</h3>
                  <p className="text-gray-400">
                    Hardware pushed to its limits. Machines burning hot through the night.
                    Everything we had went into this vision.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-2xl font-bold text-purple-500 mb-2">Patent #10,290,222</h3>
                  <p className="text-gray-400">
                    HACP™ technology officially protected. The breakthrough that changes
                    how humans and AI connect forever.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
              <Image
                src="/backgrounds/LATENIGHT.png"
                alt="Late Night Development"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-light leading-relaxed">
                  "When you lose someone you love, you either break or you build something
                  that makes sure no one else feels that alone. SAINT SAL is my promise kept."
                </p>
                <cite className="text-yellow-500 text-sm mt-4 block">— Ryan, Founder</cite>
              </div>
            </div>
          </div>

          {/* The Technical Achievement */}
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-2xl p-8 border border-yellow-500/30">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">The Breakthrough</h3>
              <p className="text-gray-300 text-lg">What 19 months of obsession created</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h4 className="text-xl font-semibold text-white mb-2">Dual-AI Architecture</h4>
                <p className="text-gray-400 text-sm">Claude Sonnet 4 + GPT-5 working in perfect harmony</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h4 className="text-xl font-semibold text-white mb-2">HACP™ Protocol</h4>
                <p className="text-gray-400 text-sm">Patent-protected Human-AI Connection technology</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h4>
                <p className="text-gray-400 text-sm">Unlimited scale, 99.9% uptime, enterprise security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Cards */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extralight text-center mb-20">
            What Makes Us
            <span className="text-yellow-500"> Different</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "HACP™ Protocol",
                subtitle: "Protected Intelligence",
                description: "The only AI platform with Human-AI Connection Protocol. Your data, your control, your growth.",
                icon: "🔐",
                features: ["Patent Pending", "End-to-end encryption", "Complete ownership"]
              },
              {
                title: "Dual AI Brain",
                subtitle: "Unmatched Power",
                description: "GPT-5 and Claude Opus working in perfect harmony. Two perspectives, infinite possibilities.",
                icon: "🧠",
                features: ["Real-time processing", "Cross-validation", "99.7% accuracy"]
              },
              {
                title: "No Constraints",
                subtitle: "Unlimited Potential",
                description: "No token limits. No censorship. No boundaries. Just pure, unleashed intelligence.",
                icon: "🚀",
                features: ["24/7 availability", "Instant scaling", "White-label ready"]
              }
            ].map((card, i) => (
              <div
                key={i}
                className="group relative"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm border transition-all duration-500 ${
                  hoveredCard === i ? 'border-yellow-500/50 bg-white/10' : 'border-white/10'
                }`}>
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-2xl font-light mb-2">{card.title}</h3>
                  <p className="text-yellow-500 text-sm mb-4">{card.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{card.description}</p>
                  <ul className="space-y-2">
                    {card.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="text-yellow-500/50">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extralight mb-12">
            Trusted by
            <span className="text-yellow-500"> Visionaries</span>
          </h2>
          
          <div className="space-y-8">
            <blockquote className="text-2xl font-extralight text-gray-300 leading-relaxed">
              "This isn't just another AI. This is the future of how humans and machines collaborate. 
              SAINT SAL changed how we operate completely."
            </blockquote>
            <cite className="text-sm text-gray-500">- Enterprise Client, $50M Revenue</cite>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-light text-yellow-500 mb-2">$57.5K</div>
              <div className="text-sm text-gray-500">Pipeline Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-yellow-500 mb-2">99.7%</div>
              <div className="text-sm text-gray-500">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-yellow-500 mb-2">24/7</div>
              <div className="text-sm text-gray-500">Always There</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extralight mb-8">
            Ready to Experience
            <span className="block text-yellow-500 mt-2">The Difference?</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12">
            Join the intelligence revolution. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/demo')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-full hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              Try SAL Free
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition"
            >
              Get Started
            </button>
          </div>

          <p className="text-xs text-gray-600 mt-8">
            No constraints • No limits • Just intelligence
          </p>
        </div>
      </section>
    </div>
  )
}
