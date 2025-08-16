'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WorkstationPage() {
  const router = useRouter()
  const [activeWorkspace, setActiveWorkspace] = useState('productivity')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate connection check
    setTimeout(() => setIsConnected(true), 1000)
  }, [])

  const workspaces = [
    {
      id: 'productivity',
      name: 'Productivity Suite',
      icon: '⚡',
      description: 'Task management and workflow automation',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'analytics',
      name: 'Business Analytics',
      icon: '📊',
      description: 'Real-time metrics and insights dashboard',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: '🤝',
      description: 'Shared workspaces and communication tools',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'automation',
      name: 'AI Automation',
      icon: '🤖',
      description: 'HACP™ powered workflow automation',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  const tools = [
    { name: 'Project Manager', icon: '📋', status: 'ready' },
    { name: 'CRM Sync', icon: '🔄', status: 'syncing' },
    { name: 'Analytics Engine', icon: '📈', status: 'ready' },
    { name: 'HACP™ Processor', icon: '🧠', status: 'active' },
    { name: 'GHL Integration', icon: '🎯', status: 'ready' },
    { name: 'Document AI', icon: '📄', status: 'ready' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push('/pro')} className="text-gray-400 hover:text-white">
              ← Dashboard
            </button>
            <h1 className="text-2xl font-bold">🛠️ Workstation</h1>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isConnected ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-xs">{isConnected ? 'HACP™ ACTIVE' : 'CONNECTING'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/warroom')}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
            >
              <span>⚡</span>
              <span>Enter Warroom</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Workspace Selection */}
        <div className="w-80 bg-gray-950 border-r border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-6">🏗️ Execution Spaces</h2>
          
          <div className="space-y-3 mb-8">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => setActiveWorkspace(workspace.id)}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  activeWorkspace === workspace.id
                    ? 'border-yellow-500/50 bg-yellow-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{workspace.icon}</span>
                  <div>
                    <h3 className="font-medium text-white">{workspace.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{workspace.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Tools Status */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">🔧 ACTIVE TOOLS</h3>
            <div className="space-y-2">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-900/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{tool.icon}</span>
                    <span className="text-sm text-gray-300">{tool.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    tool.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    tool.status === 'syncing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {tool.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeWorkspace === 'productivity' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">⚡ Productivity Suite</h2>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-medium mb-1">Create Task</h3>
                  <p className="text-sm text-gray-400">Add new project task</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                  <div className="text-2xl mb-2">📅</div>
                  <h3 className="font-medium mb-1">Schedule Meeting</h3>
                  <p className="text-sm text-gray-400">Book calendar time</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-medium mb-1">Generate Report</h3>
                  <p className="text-sm text-gray-400">AI-powered insights</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 cursor-pointer">
                  <div className="text-2xl mb-2">🤖</div>
                  <h3 className="font-medium mb-1">Run Automation</h3>
                  <p className="text-sm text-gray-400">Execute workflow</p>
                </div>
              </div>

              {/* Current Projects */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-4">📋 Current Projects</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <h4 className="font-medium">SaintVisionAI Platform Optimization</h4>
                      <p className="text-sm text-gray-400">HACP™ protocol enhancement</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">IN PROGRESS</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <h4 className="font-medium">GHL Integration Testing</h4>
                      <p className="text-sm text-gray-400">CRM connectivity validation</p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">READY</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div>
                      <h4 className="font-medium">Enterprise Dashboard Deployment</h4>
                      <p className="text-sm text-gray-400">Production readiness check</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">TESTING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeWorkspace === 'analytics' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">📊 Business Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">📈 Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">System Uptime</span>
                      <span className="text-green-400 font-bold">99.97%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-blue-400 font-bold">142ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Users</span>
                      <span className="text-yellow-400 font-bold">1,247</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">🎯 HACP™ Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Escalation Rate</span>
                      <span className="text-purple-400 font-bold">8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Resolution Time</span>
                      <span className="text-green-400 font-bold">23s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Satisfaction Score</span>
                      <span className="text-yellow-400 font-bold">96.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeWorkspace === 'collaboration' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">🤝 Team Collaboration</h2>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">👥 Active Sessions</h3>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🚀</div>
                  <p>Team collaboration features coming soon</p>
                  <p className="text-sm mt-2">Built on HACP™ multi-agent architecture</p>
                </div>
              </div>
            </div>
          )}

          {activeWorkspace === 'automation' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">🤖 AI Automation</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">⚡ Active Workflows</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span>Lead Qualification</span>
                      <span className="text-green-400 text-sm">RUNNING</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span>Email Automation</span>
                      <span className="text-yellow-400 text-sm">SCHEDULED</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span>Data Sync</span>
                      <span className="text-blue-400 text-sm">SYNCING</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">🧠 HACP™ Engine</h3>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 p-4 rounded border border-yellow-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Neural Processing Active</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Dual neuro-symbolic architecture processing business logic and 
                      emotional intelligence for optimal workflow execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}