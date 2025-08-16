'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ShowcasePage() {
  const router = useRouter()
  const [activeDemo, setActiveDemo] = useState('ghl-integration')
  const [demoPlaying, setDemoPlaying] = useState(false)

  const demos = [
    {
      id: 'ghl-integration',
      title: 'GoHighLevel CRM Integration',
      description: 'Seamless two-way sync with GHL for lead management and automation',
      icon: '🎯',
      category: 'CRM',
      duration: '3:45',
      highlights: [
        'Real-time lead synchronization',
        'Automated follow-up sequences',
        'Pipeline stage automation',
        'Custom field mapping'
      ]
    },
    {
      id: 'hacp-engine',
      title: 'HACP™ Intelligence Engine',
      description: 'Patented dual neuro-symbolic architecture in action',
      icon: '🧠',
      category: 'AI',
      duration: '5:20',
      highlights: [
        'Emotion detection & escalation',
        'Context-aware responses',
        'Multi-agent orchestration',
        'Adaptive learning'
      ]
    },
    {
      id: 'workflow-automation',
      title: 'Business Workflow Automation',
      description: 'End-to-end process automation with GHL integration',
      icon: '⚡',
      category: 'Automation',
      duration: '4:15',
      highlights: [
        'Lead qualification automation',
        'Smart appointment booking',
        'Follow-up email sequences',
        'ROI tracking & analytics'
      ]
    },
    {
      id: 'enterprise-dashboard',
      title: 'Enterprise Analytics Dashboard',
      description: 'Real-time business intelligence and performance metrics',
      icon: '📊',
      category: 'Analytics',
      duration: '2:30',
      highlights: [
        'Live pipeline visualization',
        'Performance KPI tracking',
        'Predictive analytics',
        'Custom reporting'
      ]
    }
  ]

  const ghlFeatures = [
    {
      title: 'Lead Capture & Routing',
      description: 'Automatically capture leads from multiple sources and route them through your GHL pipeline with intelligent qualification.',
      icon: '🎯',
      status: 'Live'
    },
    {
      title: 'Smart Conversation Flows',
      description: 'HACP™ powered conversation intelligence that adapts to prospect behavior and escalates appropriately.',
      icon: '💬',
      status: 'Live'
    },
    {
      title: 'Pipeline Optimization',
      description: 'AI-driven insights that optimize your sales pipeline stages and improve conversion rates.',
      icon: '📈',
      status: 'Live'
    },
    {
      title: 'Automated Follow-ups',
      description: 'Intelligent follow-up sequences that adjust timing and messaging based on prospect engagement.',
      icon: '🔄',
      status: 'Live'
    }
  ]

  const playDemo = (demoId: string) => {
    setDemoPlaying(true)
    // Simulate demo playback
    setTimeout(() => setDemoPlaying(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push('/pro')} className="text-gray-400 hover:text-white">
              ← Dashboard
            </button>
            <h1 className="text-2xl font-bold">🎪 Demo Showcase</h1>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">
              LIVE DEMOS
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/crm')}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <span>🎯</span>
              <span>Live GHL Portal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Demo Selection */}
        <div className="w-80 bg-gray-950 border-r border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-6">🎬 Featured Demos</h2>
          
          <div className="space-y-3">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  activeDemo === demo.id
                    ? 'border-yellow-500/50 bg-yellow-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{demo.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white text-sm">{demo.title}</h3>
                      <span className="text-xs text-gray-500">{demo.duration}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{demo.description}</p>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {demo.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* GHL Emphasis Section */}
          <div className="mt-8 border-t border-gray-800 pt-6">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 p-4 rounded-lg border border-blue-500/30">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">🎯 GHL INTEGRATION</h3>
              <p className="text-xs text-gray-300">
                See how SaintVisionAI seamlessly integrates with GoHighLevel to supercharge 
                your CRM and automate your entire sales process.
              </p>
              <button 
                onClick={() => router.push('/crm')}
                className="mt-3 w-full py-2 bg-blue-600 rounded text-white text-xs hover:bg-blue-700 transition"
              >
                🚀 Access Live GHL Portal
              </button>
            </div>
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeDemo === 'ghl-integration' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">🎯 GoHighLevel CRM Integration</h2>
                <button 
                  onClick={() => playDemo('ghl-integration')}
                  className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  disabled={demoPlaying}
                >
                  <span>{demoPlaying ? '⏸️' : '▶️'}</span>
                  <span>{demoPlaying ? 'Playing...' : 'Play Demo'}</span>
                </button>
              </div>

              {/* Demo Video Placeholder */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-8 h-96 flex items-center justify-center">
                {demoPlaying ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">🎯</div>
                    <h3 className="text-xl font-semibold mb-2">GHL Integration Demo Playing</h3>
                    <p className="text-gray-400">Showcasing real-time CRM synchronization</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">📺</div>
                    <h3 className="text-xl font-semibold mb-2">GoHighLevel CRM Integration</h3>
                    <p className="text-gray-400 mb-4">See how SaintVisionAI connects with your GHL account</p>
                    <button 
                      onClick={() => playDemo('ghl-integration')}
                      className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                      ▶️ Play Demo (3:45)
                    </button>
                  </div>
                )}
              </div>

              {/* GHL Features Grid */}
              <h3 className="text-xl font-semibold mb-6">🚀 GHL Integration Features</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {ghlFeatures.map((feature, index) => (
                  <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{feature.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live GHL Access */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-500/30">
                <h4 className="text-lg font-semibold mb-3">🔥 Live GHL Integration</h4>
                <p className="text-gray-300 mb-4">
                  Ready to see it in action? Access the live GoHighLevel portal directly from your dashboard 
                  and watch as SaintVisionAI enhances every aspect of your CRM workflow.
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => router.push('/crm')}
                    className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    🎯 Open Live GHL Portal
                  </button>
                  <button 
                    onClick={() => router.push('/connectivity')}
                    className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                  >
                    🔧 Check Connectivity
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'hacp-engine' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">🧠 HACP™ Intelligence Engine</h2>
                <button 
                  onClick={() => playDemo('hacp-engine')}
                  className="px-6 py-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition flex items-center space-x-2"
                  disabled={demoPlaying}
                >
                  <span>{demoPlaying ? '⏸️' : '▶️'}</span>
                  <span>{demoPlaying ? 'Playing...' : 'Play Demo'}</span>
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-8 h-96 flex items-center justify-center">
                {demoPlaying ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">🧠</div>
                    <h3 className="text-xl font-semibold mb-2">HACP™ Engine Demo Playing</h3>
                    <p className="text-gray-400">Showcasing dual neuro-symbolic architecture</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-xl font-semibold mb-2">HACP™ Intelligence Engine</h3>
                    <p className="text-gray-400 mb-4">Patent #10,290,222 - Dual neuro-symbolic processing</p>
                    <button 
                      onClick={() => playDemo('hacp-engine')}
                      className="px-6 py-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
                    >
                      ▶️ Play Demo (5:20)
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 p-6 rounded-lg border border-yellow-500/30">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">⚡ Live HACP™ Experience</h4>
                <p className="text-gray-300 mb-4">
                  Experience the patented HACP™ engine firsthand in our Warroom environment. 
                  See how it adapts to conversation context and escalates intelligently.
                </p>
                <button 
                  onClick={() => router.push('/warroom')}
                  className="px-6 py-3 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
                >
                  ⚡ Enter Warroom
                </button>
              </div>
            </div>
          )}

          {activeDemo === 'workflow-automation' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">⚡ Business Workflow Automation</h2>
                <button 
                  onClick={() => playDemo('workflow-automation')}
                  className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                  disabled={demoPlaying}
                >
                  <span>{demoPlaying ? '⏸️' : '▶️'}</span>
                  <span>{demoPlaying ? 'Playing...' : 'Play Demo'}</span>
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-8 h-96 flex items-center justify-center">
                {demoPlaying ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">Automation Demo Playing</h3>
                    <p className="text-gray-400">Showcasing end-to-end workflow automation</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔄</div>
                    <h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
                    <p className="text-gray-400 mb-4">End-to-end business process automation</p>
                    <button 
                      onClick={() => playDemo('workflow-automation')}
                      className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                    >
                      ▶️ Play Demo (4:15)
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/10 p-6 rounded-lg border border-purple-500/30">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">🛠️ Build Your Automation</h4>
                <p className="text-gray-300 mb-4">
                  Ready to automate your workflows? Access the Workstation to build custom 
                  automations that integrate with your GHL account and other business tools.
                </p>
                <button 
                  onClick={() => router.push('/workstation')}
                  className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  🛠️ Open Workstation
                </button>
              </div>
            </div>
          )}

          {activeDemo === 'enterprise-dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">📊 Enterprise Analytics Dashboard</h2>
                <button 
                  onClick={() => playDemo('enterprise-dashboard')}
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  disabled={demoPlaying}
                >
                  <span>{demoPlaying ? '⏸️' : '▶️'}</span>
                  <span>{demoPlaying ? 'Playing...' : 'Play Demo'}</span>
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-8 h-96 flex items-center justify-center">
                {demoPlaying ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">📊</div>
                    <h3 className="text-xl font-semibold mb-2">Dashboard Demo Playing</h3>
                    <p className="text-gray-400">Showcasing real-time business intelligence</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-400 mb-4">Real-time business intelligence and KPIs</p>
                    <button 
                      onClick={() => playDemo('enterprise-dashboard')}
                      className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      ▶️ Play Demo (2:30)
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 p-6 rounded-lg border border-blue-500/30">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">📊 Live Dashboard</h4>
                <p className="text-gray-300 mb-4">
                  Access your live enterprise dashboard with real-time metrics, 
                  KPI tracking, and business intelligence powered by HACP™ analytics.
                </p>
                <button 
                  onClick={() => router.push('/pro')}
                  className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  📊 Open Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}