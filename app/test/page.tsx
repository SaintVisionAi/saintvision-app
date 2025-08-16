'use client'

import { useState } from 'react'

interface TestResult {
  endpoint: string
  status: 'pending' | 'success' | 'error'
  response?: any
  error?: string
  duration?: number
}

export default function TestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [testing, setTesting] = useState(false)

  const endpoints = [
    {
      name: 'HACP™ Agent',
      url: '/api/hacp/agent',
      method: 'POST',
      body: { message: 'Test HACP™ system status', userId: 'test-user' }
    },
    {
      name: 'SAL Chat',
      url: '/api/sal/chat',
      method: 'POST', 
      body: { message: 'Hello SAL, test response', threadId: null }
    },
    {
      name: 'Search Dual',
      url: '/api/search/dual',
      method: 'POST',
      body: { prompt: 'Test dual AI search' }
    },
    {
      name: 'HACP Agent (GET)',
      url: '/api/hacp/agent',
      method: 'GET',
      body: null
    }
  ]

  const testEndpoint = async (endpoint: any) => {
    const startTime = Date.now()
    
    setResults(prev => [...prev, {
      endpoint: endpoint.name,
      status: 'pending'
    }])

    try {
      const options: RequestInit = {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' }
      }
      
      if (endpoint.body) {
        options.body = JSON.stringify(endpoint.body)
      }

      const response = await fetch(endpoint.url, options)
      const data = await response.json()
      const duration = Date.now() - startTime

      setResults(prev => prev.map(r => 
        r.endpoint === endpoint.name && r.status === 'pending'
          ? { ...r, status: 'success', response: data, duration }
          : r
      ))
    } catch (error: any) {
      const duration = Date.now() - startTime
      
      setResults(prev => prev.map(r => 
        r.endpoint === endpoint.name && r.status === 'pending'
          ? { ...r, status: 'error', error: error.message, duration }
          : r
      ))
    }
  }

  const testAllEndpoints = async () => {
    setTesting(true)
    setResults([])
    
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint)
      // Wait 1 second between tests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setTesting(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 border-green-500/30 bg-green-500/10'
      case 'error': return 'text-red-400 border-red-500/30 bg-red-500/10'
      case 'pending': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4">
            🧪 SaintVision AI <span className="text-yellow-400">API Testing Center</span>
          </h1>
          <p className="text-gray-400 text-lg">Comprehensive testing suite for all AI integrations</p>
        </div>

        {/* Controls */}
        <div className="text-center mb-8">
          <button
            onClick={testAllEndpoints}
            disabled={testing}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 disabled:opacity-50"
          >
            {testing ? 'Testing All Endpoints...' : '🚀 Test All AI Systems'}
          </button>
        </div>

        {/* Individual Endpoint Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{endpoint.name}</h3>
                <button
                  onClick={() => testEndpoint(endpoint)}
                  disabled={testing}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition disabled:opacity-50"
                >
                  Test
                </button>
              </div>
              
              <div className="text-sm text-gray-400 mb-2">
                <span className="text-blue-400">{endpoint.method}</span> {endpoint.url}
              </div>
              
              {endpoint.body && (
                <div className="text-xs text-gray-500 bg-gray-900/50 rounded-lg p-3 mb-4">
                  <pre>{JSON.stringify(endpoint.body, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">🔬 Test Results</h2>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className={`p-4 rounded-xl border ${getStatusColor(result.status)}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{result.endpoint}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      {result.duration && <span>{result.duration}ms</span>}
                      <span className="uppercase font-bold">{result.status}</span>
                    </div>
                  </div>
                  
                  {result.status === 'success' && result.response && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-2">Response:</div>
                      <div className="bg-black/30 rounded-lg p-3 text-xs font-mono overflow-auto max-h-40">
                        <pre>{JSON.stringify(result.response, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  
                  {result.status === 'error' && (
                    <div className="mt-3">
                      <div className="text-xs text-red-400 mb-2">Error:</div>
                      <div className="bg-red-900/20 rounded-lg p-3 text-xs">
                        {result.error}
                      </div>
                    </div>
                  )}
                  
                  {result.status === 'pending' && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Testing...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual Test Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">⚡ Manual API Test</h2>
          
          <ManualTest />
        </div>
      </div>
    </div>
  )
}

function ManualTest() {
  const [endpoint, setEndpoint] = useState('/api/hacp/agent')
  const [method, setMethod] = useState('POST')
  const [body, setBody] = useState('{\n  "message": "Hello from manual test",\n  "userId": "test-user"\n}')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    setResponse('')
    
    try {
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' }
      }
      
      if (method !== 'GET' && body.trim()) {
        options.body = body
      }

      const startTime = Date.now()
      const res = await fetch(endpoint, options)
      const data = await res.json()
      const duration = Date.now() - startTime
      
      setResponse(JSON.stringify({ 
        status: res.status, 
        duration: `${duration}ms`,
        data 
      }, null, 2))
    } catch (error: any) {
      setResponse(`Error: ${error.message}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Endpoint</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>
      
      {method !== 'GET' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Request Body (JSON)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm"
          />
        </div>
      )}
      
      <button
        onClick={runTest}
        disabled={loading}
        className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? 'Testing...' : '🧪 Run Manual Test'}
      </button>
      
      {response && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Response</label>
          <div className="bg-black/50 border border-gray-700 rounded-lg p-4 text-sm font-mono text-green-400 overflow-auto max-h-96">
            <pre>{response}</pre>
          </div>
        </div>
      )}
    </div>
  )
}