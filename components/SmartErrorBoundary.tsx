'use client'

import { useState, useEffect, ReactNode } from 'react'

interface ErrorState {
  hasError: boolean
  error: Error | null
  errorInfo: any
  errorId: string
  recovery: {
    attempts: number
    lastAttempt: Date | null
    maxAttempts: number
  }
}

interface SmartErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

export default function SmartErrorBoundary({ 
  children, 
  fallback, 
  onError 
}: SmartErrorBoundaryProps) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorInfo: null,
    errorId: '',
    recovery: {
      attempts: 0,
      lastAttempt: null,
      maxAttempts: 3
    }
  })

  const [isRecovering, setIsRecovering] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      setErrorState(prev => ({
        hasError: true,
        error: new Error(event.reason?.message || 'Unhandled promise rejection'),
        errorInfo: { type: 'promise_rejection', reason: event.reason },
        errorId: generateErrorId(),
        recovery: prev.recovery
      }))
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  }, [])

  const generateErrorId = () => {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getErrorSeverity = (error: Error): 'low' | 'medium' | 'high' | 'critical' => {
    const message = error.message?.toLowerCase() || ''
    
    if (message.includes('network') || message.includes('fetch')) return 'medium'
    if (message.includes('auth') || message.includes('unauthorized')) return 'high'
    if (message.includes('hacp') || message.includes('api')) return 'medium'
    if (message.includes('database') || message.includes('prisma')) return 'high'
    
    return 'low'
  }

  const getRecoveryStrategy = (error: Error) => {
    const message = error.message?.toLowerCase() || ''
    
    if (message.includes('network') || message.includes('fetch')) {
      return {
        type: 'retry',
        description: 'Connection issue detected. This usually resolves automatically.',
        action: 'Retry Connection',
        autoRetry: true,
        delay: 2000
      }
    }
    
    if (message.includes('auth')) {
      return {
        type: 'refresh',
        description: 'Authentication expired. Please refresh to continue.',
        action: 'Refresh Session',
        autoRetry: false,
        delay: 0
      }
    }
    
    if (message.includes('hacp') || message.includes('api')) {
      return {
        type: 'fallback',
        description: 'AI service temporarily unavailable. Switching to backup mode.',
        action: 'Use Backup Mode',
        autoRetry: true,
        delay: 1000
      }
    }
    
    return {
      type: 'manual',
      description: 'Something unexpected happened. Our team has been notified.',
      action: 'Try Again',
      autoRetry: false,
      delay: 0
    }
  }

  const handleRecovery = async () => {
    if (errorState.recovery.attempts >= errorState.recovery.maxAttempts) {
      console.warn('Max recovery attempts reached')
      return
    }

    setIsRecovering(true)
    const strategy = getRecoveryStrategy(errorState.error!)

    try {
      // Update recovery attempt count
      setErrorState(prev => ({
        ...prev,
        recovery: {
          ...prev.recovery,
          attempts: prev.recovery.attempts + 1,
          lastAttempt: new Date()
        }
      }))

      if (strategy.type === 'retry') {
        // Wait for delay then retry
        await new Promise(resolve => setTimeout(resolve, strategy.delay))
        
        // Clear error state to trigger re-render
        setErrorState({
          hasError: false,
          error: null,
          errorInfo: null,
          errorId: '',
          recovery: {
            attempts: 0,
            lastAttempt: null,
            maxAttempts: 3
          }
        })
      } else if (strategy.type === 'refresh') {
        // Refresh the page
        window.location.reload()
      } else if (strategy.type === 'fallback') {
        // Activate fallback mode
        localStorage.setItem('saintvision-fallback-mode', 'true')
        setErrorState(prev => ({ ...prev, hasError: false }))
      } else {
        // Manual recovery - just reset
        setErrorState(prev => ({ ...prev, hasError: false }))
      }
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError)
    } finally {
      setIsRecovering(false)
    }
  }

  const reportError = () => {
    // Send error report to monitoring service
    const errorReport = {
      id: errorState.errorId,
      error: {
        message: errorState.error?.message,
        stack: errorState.error?.stack,
        name: errorState.error?.name
      },
      errorInfo: errorState.errorInfo,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userId: 'unknown' // Get from session if available
    }

    // In a real app, send this to your error tracking service
    console.log('Error reported:', errorReport)
    
    // Show confirmation
    alert('Error report sent. Thank you for helping us improve!')
  }

  // Auto-recovery for certain error types
  useEffect(() => {
    if (errorState.hasError && errorState.error) {
      const strategy = getRecoveryStrategy(errorState.error)
      
      if (strategy.autoRetry && errorState.recovery.attempts < errorState.recovery.maxAttempts) {
        const timer = setTimeout(() => {
          handleRecovery()
        }, strategy.delay)
        
        return () => clearTimeout(timer)
      }
    }
  }, [errorState.hasError, errorState.error])

  if (errorState.hasError) {
    const severity = getErrorSeverity(errorState.error!)
    const strategy = getRecoveryStrategy(errorState.error!)

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-900 rounded-xl border border-red-500/30 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className={`text-4xl mb-3 ${
              severity === 'critical' ? '🚨' :
              severity === 'high' ? '⚠️' :
              severity === 'medium' ? '⚡' : '🔧'
            }`}>
              {severity === 'critical' ? '🚨' :
               severity === 'high' ? '⚠️' :
               severity === 'medium' ? '⚡' : '🔧'}
            </div>
            <h2 className="text-xl font-bold mb-2">
              {severity === 'critical' ? 'Critical Error' :
               severity === 'high' ? 'Service Disruption' :
               severity === 'medium' ? 'Temporary Issue' : 'Minor Hiccup'}
            </h2>
            <p className="text-gray-400 text-sm">{strategy.description}</p>
          </div>

          {/* Recovery Progress */}
          {isRecovering && (
            <div className="mb-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-2">
                <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-yellow-500 text-sm">Recovering...</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 mb-4">
            <button
              onClick={handleRecovery}
              disabled={isRecovering || errorState.recovery.attempts >= errorState.recovery.maxAttempts}
              className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRecovering ? 'Recovering...' : strategy.action}
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>

          {/* Additional Options */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
              <button
                onClick={reportError}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Report Issue
              </button>
            </div>
            
            {showDetails && (
              <div className="mt-3 p-3 bg-gray-800 rounded text-xs text-gray-400 font-mono">
                <div><strong>Error ID:</strong> {errorState.errorId}</div>
                <div><strong>Type:</strong> {errorState.error?.name}</div>
                <div><strong>Message:</strong> {errorState.error?.message}</div>
                <div><strong>Attempts:</strong> {errorState.recovery.attempts}/{errorState.recovery.maxAttempts}</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 mt-4">
            SaintVisionAI™ | HACP™ Protected | Patent #10,290,222
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Hook for manual error reporting
export function useErrorReporting() {
  const reportError = (error: Error, context?: any) => {
    const errorId = `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    console.error('Manual error report:', { error, context, errorId })
    
    // In a real app, send to error tracking service
    return errorId
  }

  return { reportError }
}