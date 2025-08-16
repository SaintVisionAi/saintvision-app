'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  const [command, setCommand] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCommand = async () => {
    if (!command.trim()) return
    setLoading(true)
    try {
      const response = await fetch('/api/sal/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: command,
          agentName: 'SAINTSAL Enterprise'
        })
      })
      const data = await response.json()
      console.log('SAINTSAL Enterprise Response:', data)
    } catch (error) {
      console.error('Error:', error)
      // Fallback to dual search API
      try {
        const fallbackResponse = await fetch('/api/search/dual', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: command })
        })
        const fallbackData = await fallbackResponse.json()
        console.log('Fallback Response:', fallbackData)
      } catch (fallbackError) {
        console.error('Fallback Error:', fallbackError)
      }
    }
    setLoading(false)
    setCommand('')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center text-black font-bold">
              SV
            </div>
            <div>
              <div className="font-bold">SaintVisionAI™</div>
              <div className="text-xs text-gray-500">Cookin' Knowledge</div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <button 
            onClick={() => {setActiveSection('home'); router.push('/')}}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'home' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>🏠</span><span>Home</span>
          </button>
          <button 
            onClick={() => {setActiveSection('workstation'); router.push('/workstation')}}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'workstation' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>🛠️</span><span>Workstation</span>
          </button>
          <button 
            onClick={() => {setActiveSection('warroom'); router.push('/warroom')}}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'warroom' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>⚡</span><span>Warroom</span>
          </button>
          <button 
            onClick={() => {setActiveSection('leads'); router.push('/crm')}}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'leads' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>👥</span><span>Leads (GHL)</span>
          </button>
          <button 
            onClick={() => setActiveSection('pipelines')}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'pipelines' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>📊</span><span>Pipelines</span>
          </button>
          <button 
            onClick={() => setActiveSection('billing')}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'billing' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>💳</span><span>Billing</span>
          </button>
          <button 
            onClick={() => {setActiveSection('help'); router.push('/help')}}
            className={`w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2 ${activeSection === 'help' ? 'bg-gray-900 text-yellow-400' : ''}`}
          >
            <span>💬</span><span>Help</span>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-900 p-3 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-black text-xs font-bold">
                SV
              </div>
              <div>
                <div className="text-sm font-bold">SaintVisionAI™</div>
                <div className="text-xs text-gray-500">Cookin' Knowledge</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-yellow-500">ENTERPRISE READY</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-950 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">📊 Dashboard</h1>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">PRO TIER</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <a href="/" className="text-gray-400 hover:text-white">Home</a>
            <a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a>
            <a href="#" className="text-gray-400 hover:text-white">Support</a>
            <a href="#" className="text-gray-400 hover:text-white">● GoHighLevel</a>
            <a href="#" className="text-gray-400 hover:text-white">● PartnerTech.ai</a>
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Account</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
            <div className="text-xs text-gray-500 mb-4">Execute business workflows instantly</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <span>📋</span>
                  <h3 className="font-semibold">New Project</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">Create GHL Opportunity</p>
                <div className="text-xs text-gray-600 italic">
                  💡 Pro Tip: Use voice commands or type "@workflow" in chat for advanced automation
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <span>📅</span>
                  <h3 className="font-semibold">Book Meeting</h3>
                </div>
                <p className="text-gray-400 text-sm">GHL Calendar</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <span>🤖</span>
                  <h3 className="font-semibold">AI Companion</h3>
                </div>
                <p className="text-gray-400 text-sm">SaintSal™ 4.1</p>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg mb-6 border border-blue-800/30">
            <p className="text-sm">
              🧠 "HACP™ Dual Neuro-Symbolic Architecture Active" Welcome to your intelligent dashboard. 
              I can analyze your business metrics, optimize workflows, and provide strategic insights 
              through our patented Human-AI Connection Protocol. What would you like to accomplish?
            </p>
            <div className="mt-2 text-xs text-gray-500">SAINTSAL Enterprise Mode | Type commands below</div>
          </div>

          {/* Pipeline Overview */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">📊 Pipeline Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Active Leads</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Pipeline</p>
                <p className="text-3xl font-bold text-yellow-500">$57,500</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Revenue MTD</p>
                <p className="text-3xl font-bold text-green-500">$24.5k</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Scheduled</p>
                <p className="text-3xl font-bold text-blue-500">12</p>
              </div>
            </div>
          </div>

          {/* SAINTSAL Logo/Branding */}
          <div className="flex justify-center mb-6">
            <div className="text-6xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              SAINTSAL™
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h3 className="font-semibold mb-3">📈 Recent Activity</h3>
            <div className="text-gray-500 text-sm">
              <p>No recent activity</p>
              <p className="text-xs mt-1">Connect GHL to see live updates</p>
            </div>
          </div>
        </div>

        {/* Command Bar */}
        <div className="bg-gray-950 border-t border-gray-800 p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
              placeholder="HACP™ Dual Neuro-Symbolic Engine - Ask about metrics, workflows, or strategic analysis..."
              className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none"
              disabled={loading}
            />
            <button 
              onClick={handleCommand}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '...' : '⚡'}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>AI: SAINTSAL™ Enterprise Mode</span>
            <span>© SaintVisionAI™</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar - GHL Quick Access */}
      <div className="w-64 bg-gray-950 border-l border-gray-800 p-4">
        <h3 className="font-bold mb-4">⚡ GHL Quick Access</h3>
        <div className="space-y-2 mb-6">
          <button className="w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2">
            <span>📊</span><span>Dashboard</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2">
            <span>👥</span><span>Contacts</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2">
            <span>📅</span><span>Calendar</span>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-900 rounded flex items-center space-x-2">
            <span>📈</span><span>Pipeline</span>
          </button>
        </div>

        <div>
          <h3 className="font-bold mb-4">📊 Recent Activity</h3>
          <div className="text-sm text-gray-500">
            <p>No recent activity</p>
            <p className="text-xs mt-1">Connect GHL to see live updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}
