'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileDropZoneProps {
  onFilesUploaded: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedTypes?: string[]
  disabled?: boolean
}

export default function FileDropZone({ 
  onFilesUploaded, 
  maxFiles = 5, 
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/*', 'application/pdf', 'text/*'],
  disabled = false
}: FileDropZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (disabled || isUploading) return

    setIsUploading(true)
    
    try {
      // Validate files
      const validFiles = acceptedFiles.filter(file => {
        if (file.size > maxSize) {
          console.warn(`File ${file.name} is too large (${file.size} bytes)`)
          return false
        }
        return true
      })

      if (validFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...validFiles])
        onFilesUploaded(validFiles)
      }
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setIsUploading(false)
    }
  }, [onFilesUploaded, maxSize, disabled, isUploading])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    maxSize,
    disabled: disabled || isUploading,
    multiple: maxFiles > 1
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive && !isDragReject ? 'border-yellow-500 bg-yellow-500/10' : ''}
          ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
          ${!isDragActive ? 'border-gray-600 hover:border-gray-500 bg-gray-900/50' : ''}
          ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <>
              <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-yellow-500">Uploading files...</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 border-2 border-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              {isDragActive ? (
                <p className="text-yellow-500">Drop the files here...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-white">
                    <span className="text-yellow-500 hover:text-yellow-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    {acceptedTypes.join(', ')} • Max {formatFileSize(maxSize)} • Up to {maxFiles} files
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-semibold text-white">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-400 transition-colors"
                title="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}