'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DashboardPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Welcome back</h1>
          <p className="text-gray-400">Your AI command center</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm">AI Conversations</span>
              <span className="text-blue-500 text-xs">Ready</span>
            </div>
            <div className="text-3xl font-light text-white mb-2">—</div>
            <div className="text-xs text-gray-500">Start using WARROOM</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm">HACP™ Protocol</span>
              <span className="text-green-500 text-xs">● Active</span>
            </div>
            <div className="text-3xl font-light text-white mb-2">READY</div>
            <div className="text-xs text-gray-500">Triple-AI engine</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm">Enterprise Status</span>
              <span className="text-yellow-500 text-xs">Patent #10,290,222</span>
            </div>
            <div className="text-3xl font-light text-white mb-2">LIVE</div>
            <div className="text-xs text-gray-500">Production ready</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/warroom')}
                className="p-4 bg-black/50 border border-white/10 rounded-lg hover:bg-white/10 transition text-left"
              >
                <span className="text-2xl mb-2 block">🚀</span>
                <span className="text-sm">Open Warroom</span>
              </button>
              <button className="p-4 bg-black/50 border border-white/10 rounded-lg hover:bg-white/10 transition text-left">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm">View Analytics</span>
              </button>
              <button className="p-4 bg-black/50 border border-white/10 rounded-lg hover:bg-white/10 transition text-left">
                <span className="text-2xl mb-2 block">🔧</span>
                <span className="text-sm">Settings</span>
              </button>
              <button className="p-4 bg-black/50 border border-white/10 rounded-lg hover:bg-white/10 transition text-left">
                <span className="text-2xl mb-2 block">📚</span>
                <span className="text-sm">Documentation</span>
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-green-500">●</span>
                <span className="text-gray-400">HACP™ Protocol Active</span>
                <span className="text-gray-600 text-xs ml-auto">Ready</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-blue-500">●</span>
                <span className="text-gray-400">Triple-AI Engine Online</span>
                <span className="text-gray-600 text-xs ml-auto">Operational</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-yellow-500">●</span>
                <span className="text-gray-400">Enterprise Platform</span>
                <span className="text-gray-600 text-xs ml-auto">Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
