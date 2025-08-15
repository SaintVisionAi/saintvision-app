'use client'

import { useState, useRef, useEffect } from 'react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export default function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        const recognition = recognitionRef.current

        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
          setIsListening(true)
          setError(null)
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPart = event.results[i][0].transcript
            
            if (event.results[i].isFinal) {
              finalTranscript += transcriptPart
            } else {
              interimTranscript += transcriptPart
            }
          }

          setTranscript(finalTranscript || interimTranscript)

          if (finalTranscript) {
            onTranscript(finalTranscript)
            setTranscript('')
          }
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognition.onerror = (event) => {
          setError(`Speech recognition error: ${event.error}`)
          setIsListening(false)
        }
      } else {
        setError('Speech recognition not supported in this browser')
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onTranscript])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (error) {
    return (
      <div className="text-red-400 text-xs">
        {error}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleListening}
        disabled={disabled}
        className={`p-3 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-yellow-500 hover:bg-yellow-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {isListening && (
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-yellow-500 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-6 bg-yellow-500 animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-4 bg-yellow-500 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-xs text-gray-400">Listening...</span>
        </div>
      )}

      {transcript && (
        <div className="text-xs text-yellow-500 max-w-xs truncate">
          {transcript}
        </div>
      )}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}