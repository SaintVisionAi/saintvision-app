'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Agent {
  id: string
  name: string
  description: string
  type: 'business' | 'creative' | 'technical' | 'personal'
  status: 'active' | 'inactive' | 'training'
  conversations: number
  created: Date
  avatar: string
}

export default function AgentsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState('my-agents')
  const [showCreateAgent, setShowCreateAgent] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Business Strategist SAL',
      description: 'Expert in business planning, market analysis, and growth strategies',
      type: 'business',
      status: 'active',
      conversations: 127,
      created: new Date('2024-01-15'),
      avatar: '💼'
    },
    {
      id: '2', 
      name: 'Creative Writer SAL',
      description: 'Specialized in content creation, copywriting, and storytelling',
      type: 'creative',
      status: 'active',
      conversations: 89,
      created: new Date('2024-01-20'),
      avatar: '✍️'
    },
    {
      id: '3',
      name: 'Code Architect SAL',
      description: 'Full-stack development, API design, and software architecture',
      type: 'technical',
      status: 'training',
      conversations: 45,
      created: new Date('2024-01-25'),
      avatar: '⚡'
    }
  ])

  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    type: 'business' as Agent['type'],
    specialization: ''
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const agentTemplates = [
    {
      name: 'Sales Assistant',
      description: 'Lead qualification, proposal writing, and CRM management',
      type: 'business' as Agent['type'],
      avatar: '🎯',
      specialization: 'Sales & Lead Generation'
    },
    {
      name: 'Social Media Manager',
      description: 'Content creation, scheduling, and engagement strategies',
      type: 'creative' as Agent['type'],
      avatar: '📱',
      specialization: 'Social Media & Marketing'
    },
    {
      name: 'Data Analyst',
      description: 'Report generation, trend analysis, and insights discovery',
      type: 'technical' as Agent['type'],
      avatar: '📊',
      specialization: 'Analytics & Reporting'
    },
    {
      name: 'Customer Support',
      description: 'Query resolution, FAQ management, and user assistance',
      type: 'business' as Agent['type'],
      avatar: '🎧',
      specialization: 'Support & Communication'
    },
    {
      name: 'Content Creator',
      description: 'Blog posts, articles, and educational content',
      type: 'creative' as Agent['type'],
      avatar: '📝',
      specialization: 'Content & SEO'
    },
    {
      name: 'Personal Assistant',
      description: 'Task management, scheduling, and daily organization',
      type: 'personal' as Agent['type'],
      avatar: '🗓️',
      specialization: 'Productivity & Organization'
    }
  ]

  const createAgent = async () => {
    if (!newAgent.name || !newAgent.description) return

    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description,
      type: newAgent.type,
      status: 'training',
      conversations: 0,
      created: new Date(),
      avatar: getAgentAvatar(newAgent.type)
    }

    setAgents(prev => [...prev, agent])
    setNewAgent({ name: '', description: '', type: 'business', specialization: '' })
    setShowCreateAgent(false)

    // Simulate training completion
    setTimeout(() => {
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? { ...a, status: 'active' as Agent['status'] } : a
      ))
    }, 3000)
  }

  const getAgentAvatar = (type: Agent['type']) => {
    const avatars = {
      business: '💼',
      creative: '🎨',
      technical: '⚡',
      personal: '👤'
    }
    return avatars[type]
  }

  const getStatusColor = (status: Agent['status']) => {
    const colors = {
      active: 'text-green-400 border-green-500/30 bg-green-500/10',
      inactive: 'text-gray-400 border-gray-500/30 bg-gray-500/10',
      training: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
    }
    return colors[status]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* SAINTSAL Background - Enterprise Branding */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/backgrounds/STICKYSAL.png"
          alt="SAINTSAL Enterprise Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        
        {/* Header */}
        <div className={`border-b border-gray-800/50 bg-black/40 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-light text-white mb-3">
                  AI <span className="text-blue-400" style={{
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                  }}>Agents</span>
                </h1>
                <p className="text-gray-400 text-lg">Create, deploy, and manage your specialized AI assistants</p>
              </div>

              <button
                onClick={() => setShowCreateAgent(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Agent</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedTab('my-agents')}
                className={`pb-3 border-b-2 transition-colors ${selectedTab === 'my-agents' ? 'border-blue-400 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                My Agents ({agents.length})
              </button>
              <button
                onClick={() => setSelectedTab('templates')}
                className={`pb-3 border-b-2 transition-colors ${selectedTab === 'templates' ? 'border-blue-400 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                Agent Templates
              </button>
              <button
                onClick={() => setSelectedTab('marketplace')}
                className={`pb-3 border-b-2 transition-colors ${selectedTab === 'marketplace' ? 'border-blue-400 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                Marketplace
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* My Agents Tab */}
          {selectedTab === 'my-agents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  
                  {/* Agent Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center text-2xl">
                        {agent.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(agent.status)}`}>
                          {agent.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-white transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <button onClick={() => router.push(`/warroom?agent=${agent.id}`)} className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                          Chat with Agent
                        </button>
                        <button className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition">
                          Edit Agent
                        </button>
                        <button className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition">
                          Delete Agent
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Agent Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {agent.description}
                  </p>

                  {/* Agent Stats */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-500">
                      <span className="text-blue-400 font-medium">{agent.conversations}</span> conversations
                    </div>
                    <div className="text-gray-500">
                      Created {agent.created.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => router.push(`/warroom?agent=${agent.id}`)}
                    className="w-full mt-4 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                  >
                    Start Conversation
                  </button>
                </div>
              ))}

              {/* Create New Agent Card */}
              <div 
                onClick={() => setShowCreateAgent(true)}
                className="bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border-2 border-dashed border-gray-600/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center min-h-[280px]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Create New Agent</h3>
                <p className="text-gray-400 text-sm">Build a custom AI assistant tailored to your specific needs</p>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {selectedTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentTemplates.map((template, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center text-2xl">
                      {template.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                      <span className="text-xs text-purple-400">{template.specialization}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {template.description}
                  </p>

                  <button
                    onClick={() => {
                      setNewAgent({
                        name: template.name,
                        description: template.description,
                        type: template.type,
                        specialization: template.specialization
                      })
                      setShowCreateAgent(true)
                    }}
                    className="w-full px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Marketplace Tab */}
          {selectedTab === 'marketplace' && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Agent Marketplace</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Discover and deploy pre-built agents created by the SaintVision AI community
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Agent Modal */}
      {showCreateAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Create New Agent</h2>
              <button
                onClick={() => setShowCreateAgent(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Marketing Assistant SAL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newAgent.description}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this agent specializes in and how it can help users..."
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agent Type</label>
                <select
                  value={newAgent.type}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, type: e.target.value as Agent['type'] }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="business">Business & Strategy</option>
                  <option value="creative">Creative & Content</option>
                  <option value="technical">Technical & Development</option>
                  <option value="personal">Personal & Productivity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Specialization (Optional)</label>
                <input
                  type="text"
                  value={newAgent.specialization}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="e.g., Social Media Marketing, Sales Automation"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCreateAgent(false)}
                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={createAgent}
                disabled={!newAgent.name || !newAgent.description}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
