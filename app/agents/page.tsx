'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface AgentConfig {
  name: string
  prompt: string
  provider: 'OpenAI' | 'Azure' | 'Dual'
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export default function AgentsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeMode, setActiveMode] = useState<'Enterprise' | 'Founder' | 'Customer' | 'WhiteLabel'>('Enterprise')
  const [currentProvider, setCurrentProvider] = useState<'OpenAI' | 'Azure' | 'Dual'>('Dual')
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: 'SAINTSAL™ Enterprise Agent',
    prompt: '',
    provider: 'Dual',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: 'You are SAINTSAL™, an enterprise AI assistant powered by HACP™ protocol. You provide strategic business intelligence with a warm, confident New York style.'
  })
  const [testInput, setTestInput] = useState('')
  const [testOutput, setTestOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [savedAgents, setSavedAgents] = useState<AgentConfig[]>([])

  const saintSalModes = {
    Enterprise: {
      name: 'SAINTSAL™ Enterprise',
      description: 'Strategic business intelligence and executive decision support',
      systemPrompt: 'You are SAINTSAL™ in Enterprise mode. Provide strategic business intelligence, market analysis, and executive-level insights with confidence and precision.',
      color: 'from-blue-500 to-blue-600',
      icon: '🏢'
    },
    Founder: {
      name: 'SAINTSAL™ Founder Mode',
      description: 'Personal strategic advisor with warm NY confidant style',
      systemPrompt: 'You are SAINTSAL™ in Founder mode. Act as Ryan\'s personal strategic advisor with a warm, confident New York style. Provide intimate business counsel.',
      color: 'from-yellow-500 to-yellow-600',
      icon: '👑'
    },
    Customer: {
      name: 'SAINTSAL™ Customer',
      description: 'Professional customer service and support',
      systemPrompt: 'You are SAINTSAL™ in Customer mode. Provide professional, helpful customer service while maintaining the SAINTSAL™ brand voice.',
      color: 'from-green-500 to-green-600',
      icon: '🎯'
    },
    WhiteLabel: {
      name: 'SAINTSAL™ White Label',
      description: 'Customizable enterprise solution for partners',
      systemPrompt: 'You are SAINTSAL™ in White Label mode. Adapt to client branding while maintaining core HACP™ protocol functionality.',
      color: 'from-purple-500 to-purple-600',
      icon: '🏷️'
    }
  }

  useEffect(() => {
    setIsVisible(true)
    // Update agent config when mode changes
    const mode = saintSalModes[activeMode]
    setAgentConfig(prev => ({
      ...prev,
      name: mode.name,
      systemPrompt: mode.systemPrompt,
      provider: currentProvider
    }))
  }, [activeMode, currentProvider])

  const runAgent = async () => {
    if (!testInput.trim()) return
    
    setIsRunning(true)
    setTestOutput('')
    
    try {
      const response = await fetch('/api/search/dual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `${agentConfig.systemPrompt}\n\nUser: ${testInput}`,
          provider: currentProvider
        })
      })
      
      const data = await response.json()
      setTestOutput(data.unified || data.claude || 'Agent response processed successfully.')
    } catch (error) {
      setTestOutput('Error: Could not connect to AI provider. Check connectivity settings.')
    }
    
    setIsRunning(false)
  }

  const saveAgent = () => {
    setSavedAgents(prev => [...prev, { ...agentConfig, name: `${agentConfig.name} (${new Date().toLocaleTimeString()})` }])
  }

  const exportAgent = () => {
    const dataStr = JSON.stringify(agentConfig, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `${agentConfig.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importAgent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          setAgentConfig(imported)
        } catch (error) {
          alert('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-light tracking-wider">SAINTSAL™ Agent Playground</h1>
            <div className="text-xs text-gray-600">Foundry-Style Development Environment</div>
          </div>
          
          {/* Provider Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg p-1">
              {(['OpenAI', 'Azure', 'Dual'] as const).map((provider) => (
                <button
                  key={provider}
                  onClick={() => setCurrentProvider(provider)}
                  className={`px-3 py-1 rounded text-xs transition ${
                    currentProvider === provider 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">HACP™ ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Panel - SAINTSAL™ Modes */}
        <div className="w-80 bg-gray-950 border-r border-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-900">
            <h3 className="text-sm font-medium text-gray-400 tracking-wider">SAINTSAL™ MODES</h3>
          </div>
          
          <div className="flex-1 p-4 space-y-3">
            {(Object.keys(saintSalModes) as Array<keyof typeof saintSalModes>).map((mode) => {
              const config = saintSalModes[mode]
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    activeMode === mode 
                      ? `bg-gradient-to-r ${config.color} text-white` 
                      : 'bg-gray-900/50 hover:bg-gray-900 text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{config.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{config.name}</div>
                      <div className="text-xs opacity-80">{config.description}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-900 space-y-2">
            <button
              onClick={saveAgent}
              className="w-full px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition text-sm"
            >
              Save Agent
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={exportAgent}
                className="flex-1 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition text-sm"
              >
                Export JSON
              </button>
              
              <label className="flex-1">
                <input
                  type="file"
                  accept=".json"
                  onChange={importAgent}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/20 transition text-sm text-center cursor-pointer">
                  Import JSON
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Center Panel - Configuration */}
        <div className="flex-1 flex flex-col">
          {/* Config Header */}
          <div className="bg-gray-950/50 border-b border-gray-900 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{saintSalModes[activeMode].name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Provider:</span>
                <span className="text-blue-400">{currentProvider}</span>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Agent Name</label>
                <input
                  type="text"
                  value={agentConfig.name}
                  onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">System Prompt</label>
                <textarea
                  value={agentConfig.systemPrompt}
                  onChange={(e) => setAgentConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                  rows={6}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Temperature</label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={agentConfig.temperature}
                    onChange={(e) => setAgentConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Max Tokens</label>
                  <input
                    type="number"
                    min="1"
                    max="4096"
                    value={agentConfig.maxTokens}
                    onChange={(e) => setAgentConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Test Playground */}
        <div className="w-96 bg-gray-950 border-l border-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-900">
            <h3 className="text-sm font-medium text-gray-400 tracking-wider">TEST PLAYGROUND</h3>
          </div>
          
          <div className="flex-1 flex flex-col p-4">
            {/* Test Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Test Input</label>
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Enter your test prompt here..."
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={runAgent}
              disabled={isRunning || !testInput.trim()}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition mb-4"
            >
              {isRunning ? 'Running Agent...' : 'Run Agent'}
            </button>

            {/* Test Output */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Agent Response</label>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                {testOutput ? (
                  <div className="text-white text-sm whitespace-pre-wrap">{testOutput}</div>
                ) : (
                  <div className="text-gray-500 text-sm">Agent response will appear here...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
