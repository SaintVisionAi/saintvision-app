'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export default function WhyPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Enterprise Professional */}
      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* SAINTSAL + YOU Background - FIXED LIKE HOMEPAGE */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/backgrounds/STICKYSAL.png"
            alt="SaintSal + You - Enterprise Partnership"
            fill
            className="object-contain opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60" />
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8">
            <span className="block">What Separates</span>
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-bold">
              SaintVision AI™
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            We're not just building AI. We're building the future of human potential, 
            where technology serves purpose and intelligence serves the heart.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-sm text-blue-400">🔐 Patented HACP™ Technology</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="text-sm text-green-400">💚 Faith-Guided Innovation</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
              <span className="text-sm text-yellow-400">👑 Enterprise-Grade Solutions</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/demo')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              🚀 Experience the Difference
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition"
            >
              📖 Learn Our Story
            </button>
          </div>
        </div>
      </section>

      {/* We're Doing Great Things Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            We're Doing <span className="text-yellow-500 font-semibold">Great Things</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-16">
            To Change Lives. Every breakthrough, every innovation, every line of code is written with 
            one purpose: empowering human potential through divine wisdom and cutting-edge technology.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Patented HACP Technology */}
            <div className="text-center p-8 bg-gradient-to-b from-yellow-500/10 to-yellow-600/5 rounded-2xl border border-yellow-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-500 text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Patented HACP™ Technology</h3>
              <p className="text-gray-400 text-sm mb-6">
                Our Human-AI Connection Protocol (U.S. Patent 10,290,222) is the only AI system that 
                truly adapts to human emotion and escalates intelligently. This isn't just AI—it's 
                emotional intelligence.
              </p>
              <button className="text-yellow-500 text-sm hover:text-yellow-400 transition">
                Learn about our patent →
              </button>
            </div>

            {/* Faith-Guided Innovation */}
            <div className="text-center p-8 bg-gradient-to-b from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-500 text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Faith-Guided Innovation</h3>
              <p className="text-gray-400 text-sm mb-6">
                Technology with purpose. Every feature we build is guided by principles of service, 
                integrity, and genuine care for human flourishing. AI that serves, not exploits.
              </p>
              <button className="text-blue-500 text-sm hover:text-blue-400 transition">
                Discover our mission →
              </button>
            </div>

            {/* Enterprise-Grade Security */}
            <div className="text-center p-8 bg-gradient-to-b from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-400 text-sm mb-6">
                GDPR, CCPA, SOC 2 compliant with AES-256 encryption. Delaware LP structure with 
                separated IP holdings for maximum protection and investor confidence.
              </p>
              <button className="text-green-500 text-sm hover:text-green-400 transition">
                View our compliance →
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Adaptive Intelligence */}
            <div className="text-center p-8 bg-gradient-to-b from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <span className="text-emerald-500 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Adaptive Intelligence</h3>
              <p className="text-gray-400 text-sm mb-6">
                SaintSal doesn't just respond—it learns, adapts, and grows with you. Real-time 
                emotional calibration ensures every interaction feels personal and meaningful.
              </p>
              <button className="text-emerald-500 text-sm hover:text-emerald-400 transition">
                Experience SaintSal →
              </button>
            </div>

            {/* Global Impact Focus */}
            <div className="text-center p-8 bg-gradient-to-b from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-500 text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Global Impact Focus</h3>
              <p className="text-gray-400 text-sm mb-6">
                From healthcare to education, from enterprise to personal growth—our AI 
                ecosystems are deployed where they matter most, changing lives at scale.
              </p>
              <button className="text-purple-500 text-sm hover:text-purple-400 transition">
                See our impact →
              </button>
            </div>

            {/* Human-Centered Design */}
            <div className="text-center p-8 bg-gradient-to-b from-orange-500/10 to-orange-600/5 rounded-2xl border border-orange-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Human-Centered Design</h3>
              <p className="text-gray-400 text-sm mb-6">
                Every interface, every interaction, every algorithm is designed with human dignity at 
                its core. Technology that enhances humanity, not replaces it.
              </p>
              <button className="text-orange-500 text-sm hover:text-orange-400 transition">
                See our approach →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">$75M+</div>
              <div className="text-sm text-gray-500">Patent Portfolio Value</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">99.9%</div>
              <div className="text-sm text-gray-500">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">25+</div>
              <div className="text-sm text-gray-500">AI Tools & Features</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">100%</div>
              <div className="text-sm text-gray-500">Purpose-Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* Effortlessly Powerful Section */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            <span className="text-blue-500">Effortlessly</span> Powerful
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            Complex AI technology made simple. Our interfaces are designed for humans, not engineers.
          </p>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-white mb-8">One-Click AI Deployment</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Instant Setup</h4>
                    <p className="text-gray-400 text-sm">
                      Deploy enterprise-grade AI in under 5 minutes. No technical expertise required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Intuitive Interface</h4>
                    <p className="text-gray-400 text-sm">
                      Natural conversation flows that feel like talking to your smartest colleague.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Zero Learning Curve</h4>
                    <p className="text-gray-400 text-sm">
                      Start getting value immediately. Our AI adapts to you, not the other way around.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-12 border border-blue-500/30">
                <div className="text-6xl font-bold text-blue-500 mb-4">5min</div>
                <div className="text-xl text-white mb-2">Average Setup Time</div>
                <div className="text-sm text-gray-400">From zero to AI-powered in minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise-Grade Technology Stack */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            <span className="text-yellow-500">Enterprise-Grade</span> Technology Stack
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            Built on Azure Cognitive Services with patented HACP™ protocol and military-grade security.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {/* Azure AI */}
            <div className="p-8 bg-gradient-to-b from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-500 text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Azure AI</h3>
              <p className="text-gray-400 text-sm">
                Microsoft's enterprise AI infrastructure powers our cognitive engine
              </p>
            </div>

            {/* HACP Protocol */}
            <div className="p-8 bg-gradient-to-b from-yellow-500/10 to-yellow-600/5 rounded-2xl border border-yellow-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-500 text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">HACP™ Protocol</h3>
              <p className="text-gray-400 text-sm">
                Patented adaptive escalation technology (US 10,290,222)
              </p>
            </div>

            {/* Real-Time Sync */}
            <div className="p-8 bg-gradient-to-b from-cyan-500/10 to-cyan-600/5 rounded-2xl border border-cyan-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-500 text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Real-Time Sync</h3>
              <p className="text-gray-400 text-sm">
                Millisecond response times with global edge deployment
              </p>
            </div>

            {/* Multi-Modal AI */}
            <div className="p-8 bg-gradient-to-b from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Modal AI</h3>
              <p className="text-gray-400 text-sm">
                Text, voice, image, and gesture recognition in one platform
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Security & Compliance */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">🔒</span>
                Security & Compliance
              </h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• SOC 2 Type II Certified</li>
                <li>• GDPR & CCPA Compliant</li>
                <li>• AES-256 Encryption</li>
                <li>• Zero-Trust Architecture</li>
              </ul>
            </div>

            {/* Performance & Scale */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-blue-500 mr-2">⭐</span>
                Performance & Scale
              </h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• 99.9% Uptime SLA</li>
                <li>• Auto-scaling Infrastructure</li>
                <li>• Global CDN Distribution</li>
                <li>• Millisecond Response Times</li>
              </ul>
            </div>

            {/* AI Capabilities */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-purple-500 mr-2">🚀</span>
                AI Capabilities
              </h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• GPT-4 & Claude Integration</li>
                <li>• Custom Model Training</li>
                <li>• Emotional Intelligence</li>
                <li>• Adaptive Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Applications */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            Real-World <span className="text-green-500">Applications</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            See how Saint Vision AI transforms industries and changes lives across healthcare, 
            education, and enterprise.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Healthcare & Therapy */}
            <div className="text-left">
              <div className="flex items-start space-x-4 mb-8">
                <span className="text-red-500 text-3xl">💚</span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Healthcare & Therapy</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Athena.ai revolutionizes patient care with adaptive therapy protocols and 
                    emotional intelligence that helps stroke patients, ADHD management, and autism 
                    support programs.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>40% faster recovery rates in stroke rehabilitation</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>85% patient engagement improvement</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>HIPAA-compliant with family integration</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-6 border border-red-500/30">
                    <div className="text-3xl font-bold text-red-500 mb-2">95%</div>
                    <div className="text-sm text-white">Patient Satisfaction</div>
                    <div className="text-xs text-gray-400">Athena.ai therapy programs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Operations */}
            <div className="text-left">
              <div className="flex items-start space-x-4 mb-8">
                <span className="text-blue-500 text-3xl">📊</span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Enterprise Operations</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    PartnerTech.ai and our WarRoom platform streamline business operations, 
                    automate workflows, and provide intelligent insights that drive growth and 
                    efficiency.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>Automated CRM routing and lead qualification</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-orange-500">✓</span>
                      <span>Real-time business intelligence dashboards</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>24/7 AI-powered customer support</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-500 mb-2">300%</div>
                    <div className="text-sm text-white">ROI Increase</div>
                    <div className="text-xs text-gray-400">Enterprise implementations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Training */}
            <div className="text-left">
              <div className="flex items-start space-x-4 mb-8">
                <span className="text-purple-500 text-3xl">🎓</span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Education & Training</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    SVTTeach.ai transforms learning with adaptive curricula that scale from individual 
                    tutoring to enterprise training programs, all powered by our HACP™ escalation 
                    protocol.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-yellow-500">✓</span>
                      <span>Personalized learning paths for every student</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>Real-time progress tracking and insights</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span className="text-green-500">✓</span>
                      <span>Scalable from 1 to 10,000+ learners</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/30">
                    <div className="text-3xl font-bold text-purple-500 mb-2">67%</div>
                    <div className="text-sm text-white">Learning Speed</div>
                    <div className="text-xs text-gray-400">Improvement vs traditional methods</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            Ready to Experience the Difference?
          </h2>
          
          <p className="text-lg text-gray-400 mb-12">
            Join thousands of organizations who've discovered what happens when AI 
            meets purpose, when technology serves the heart, and when innovation 
            changes lives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/demo')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              🚀 Start Your Journey
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition"
            >
              💚 Learn Our Story
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
