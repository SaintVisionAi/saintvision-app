'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CRMPage() {
  const router = useRouter()
  const [iframeKey, setIframeKey] = useState(0)
  
  // GHL iframe URL - replace with actual GHL domain
  const ghlUrl = "https://app.gohighlevel.com"
  
  const refreshSession = () => {
    setIframeKey(prev => prev + 1)
  }
  
  const openInGHL = () => {
    window.open(ghlUrl, '_blank')
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Controls */}
      <div className="bg-black border-b border-gray-900 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/pro')}
              className="text-gray-500 hover:text-white transition flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
            <div className="text-gray-500">|</div>
            <div>
              <h1 className="text-xl font-light tracking-wider">CRM</h1>
              <p className="text-xs text-gray-600">Live Proof of Operations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">LIVE OPERATIONS</span>
            </div>
            
            {/* Action Buttons */}
            <button
              onClick={refreshSession}
              className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition"
            >
              Refresh Session
            </button>
            
            <button
              onClick={openInGHL}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition"
            >
              Open in GHL ↗
            </button>
          </div>
        </div>
      </div>
      
      {/* Live Operations Banner */}
      <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border-b border-gray-900 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">● Active Pipeline</span>
              <span className="text-blue-400">● Lead Management</span>
              <span className="text-yellow-400">● Automation Running</span>
            </div>
            <div className="text-gray-500">
              Real-time GHL operations • Connected to SaintVisionAI™
            </div>
          </div>
        </div>
      </div>
      
      {/* GHL Iframe Container */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-950/50 border border-gray-900 rounded-xl overflow-hidden">
            {/* Iframe Header */}
            <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">GoHighLevel CRM</span>
                </div>
                <div className="text-xs text-gray-600">
                  saintvisionai.com integrated
                </div>
              </div>
            </div>
            
            {/* Main Iframe */}
            <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
              <iframe
                key={iframeKey}
                src={ghlUrl}
                className="w-full h-full"
                title="GoHighLevel CRM"
                allow="camera; microphone; clipboard-read; clipboard-write"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
              
              {/* Overlay for demo purposes */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">Live CRM Operations</h2>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Real-time GoHighLevel integration showing active pipelines, 
                    lead management, and automation workflows.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm text-green-400">✓ Pipeline: 47 active leads</div>
                    <div className="text-sm text-blue-400">✓ Automation: 12 sequences running</div>
                    <div className="text-sm text-yellow-400">✓ Integration: SaintVisionAI™ connected</div>
                  </div>
                  <button
                    onClick={openInGHL}
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Open Full CRM ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
