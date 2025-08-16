'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ServiceStatus {
  name: string
  status: 'connected' | 'disconnected' | 'checking'
  lastChecked: Date
  envVar: string
  description: string
  icon: string
  color: string
}

export default function ConnectivityPage() {
  const router = useRouter()
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'OpenAI',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'OPENAI_API_KEY',
      description: 'GPT-4 and language models',
      icon: '🤖',
      color: 'green'
    },
    {
      name: 'Azure AI',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'AZURE_OPENAI_KEY',
      description: 'Azure Cognitive Services',
      icon: '☁️',
      color: 'blue'
    },
    {
      name: 'Stripe',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'STRIPE_SECRET_KEY',
      description: 'Payment processing',
      icon: '💳',
      color: 'purple'
    },
    {
      name: 'Supabase',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'SUPABASE_URL',
      description: 'Database and authentication',
      icon: '🗄️',
      color: 'emerald'
    },
    {
      name: 'Twilio',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'TWILIO_ACCOUNT_SID',
      description: 'SMS and voice services',
      icon: '📱',
      color: 'red'
    },
    {
      name: 'GoHighLevel',
      status: 'checking',
      lastChecked: new Date(),
      envVar: 'GHL_API_KEY',
      description: 'CRM and automation',
      icon: '🏢',
      color: 'orange'
    }
  ])
  
  const [showFixModal, setShowFixModal] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    checkConnectivity()
  }, [])

  const checkConnectivity = async () => {
    setIsRefreshing(true)
    
    for (const service of services) {
      try {
        const response = await fetch('/api/connectivity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ service: service.name.toLowerCase() })
        })
        
        const data = await response.json()
        
        setServices(prev => prev.map(s => 
          s.name === service.name 
            ? { 
                ...s, 
                status: data.connected ? 'connected' : 'disconnected',
                lastChecked: new Date()
              } 
            : s
        ))
      } catch (error) {
        setServices(prev => prev.map(s => 
          s.name === service.name 
            ? { 
                ...s, 
                status: 'disconnected',
                lastChecked: new Date()
              } 
            : s
        ))
      }
      
      // Add delay between checks to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsRefreshing(false)
  }

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500'
      case 'disconnected':
        return 'bg-red-500'
      case 'checking':
        return 'bg-yellow-500 animate-pulse'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'disconnected':
        return 'Disconnected'
      case 'checking':
        return 'Checking...'
      default:
        return 'Unknown'
    }
  }

  const openFixModal = (service: ServiceStatus) => {
    setSelectedService(service)
    setShowFixModal(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
              <h1 className="text-xl font-light tracking-wider">Connectivity</h1>
              <p className="text-xs text-gray-600">Service Status Monitor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={checkConnectivity}
              disabled={isRefreshing}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 disabled:opacity-50 transition"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
              onClick={() => setShowFixModal(true)}
              className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition"
            >
              Fix
            </button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-gradient-to-r from-gray-950/50 to-black/50 border-b border-gray-900 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-400">
                System Status: 
                <span className={`ml-2 ${
                  services.every(s => s.status === 'connected') 
                    ? 'text-green-400' 
                    : services.some(s => s.status === 'connected')
                      ? 'text-yellow-400'
                      : 'text-red-400'
                }`}>
                  {services.every(s => s.status === 'connected') 
                    ? 'All Systems Operational' 
                    : services.some(s => s.status === 'connected')
                      ? 'Partial Connectivity'
                      : 'Systems Down'
                  }
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="bg-gray-950/50 border border-gray-900 rounded-xl p-6 hover:border-gray-800 transition">
              {/* Service Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-white">{service.name}</h3>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </div>
                </div>
                
                {/* Status Light */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                  <span className={`text-sm ${
                    service.status === 'connected' 
                      ? 'text-green-400' 
                      : service.status === 'disconnected'
                        ? 'text-red-400'
                        : 'text-yellow-400'
                  }`}>
                    {getStatusText(service.status)}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Environment Variable:</span>
                  <code className="text-gray-300 bg-gray-800 px-2 py-1 rounded text-xs">
                    {service.envVar}
                  </code>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Last Checked:</span>
                  <span className="text-gray-300">{service.lastChecked.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Action Button */}
              {service.status === 'disconnected' && (
                <button
                  onClick={() => openFixModal(service)}
                  className="w-full mt-4 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                >
                  Fix Connection
                </button>
              )}
              
              {service.status === 'connected' && (
                <div className="w-full mt-4 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-center text-sm">
                  ✓ Connection Verified
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fix Modal */}
      {showFixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Fix {selectedService?.name || 'Service'} Connection
              </h2>
              <button
                onClick={() => setShowFixModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h3 className="text-yellow-500 font-medium mb-1">Environment Variable Missing</h3>
                    <p className="text-yellow-400/80 text-sm">
                      To fix this connection, add the following environment variable to your .env.local file:
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Environment Variable Name
                </label>
                <code className="block w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-green-400 font-mono">
                  {selectedService?.envVar}
                </code>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Value (enter your API key/URL)
                </label>
                <input
                  type="password"
                  placeholder="Enter your API key or service URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Instructions:</h4>
                <ol className="text-blue-400/80 text-sm space-y-1 list-decimal list-inside">
                  <li>Copy the environment variable name above</li>
                  <li>Add it to your .env.local file in the project root</li>
                  <li>Set the value to your {selectedService?.name} API key</li>
                  <li>Restart your development server</li>
                  <li>Click "Refresh" to test the connection</li>
                </ol>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowFixModal(false)}
                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowFixModal(false)
                  checkConnectivity()
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition"
              >
                Test Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
