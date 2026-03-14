import { useState, useRef, useCallback } from 'react'
import { uploadToR2 } from '../services/r2Service'
import { getRuntimeConfig } from '../services/runtimeConfig'

export function usePdfCompressor() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | uploading | done | error
  const [progress, setProgress] = useState(0)
  const [originalSize, setOriginalSize] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloadName, setDownloadName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (f) => {
    if (!f) return
    if (f.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF file.')
      return
    }
    setFile(f)
    setOriginalSize(f.size)
    setStatus('idle')
    setErrorMsg('')
    setDownloadUrl('')
    setDownloadName('')
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileInput = (e) => {
    handleFile(e.target.files[0])
  }

  const handleCompress = async () => {
    if (!file) return
    try {
      setStatus('uploading')
      setProgress(20)
      setErrorMsg('')

      const { key: objectKey } = await uploadToR2(file)

      setProgress(60)
      setStatus('compressing')

      const runtimeConfig = await getRuntimeConfig()
      const backendUrl = runtimeConfig.pdfCompressorBackendUrl || import.meta.env.VITE_PDF_COMPRESSOR_BACKEND_URL
      if (!backendUrl) {
        throw new Error('PDF compressor backend URL is not configured.')
      }

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object_key: objectKey }),
      })

      if (!response.ok) {
        throw new Error(`Compression failed: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const name = file.name.replace(/\.pdf$/i, '_compressed.pdf')

      setDownloadUrl(url)
      setDownloadName(name)
      setProgress(100)
      setStatus('done')

      // Auto-trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.click()
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.')
      setStatus('error')
    }
  }

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFile(null)
    setStatus('idle')
    setProgress(0)
    setOriginalSize(0)
    setDownloadUrl('')
    setDownloadName('')
    setErrorMsg('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return {
    file,
    status,
    progress,
    originalSize,
    downloadUrl,
    downloadName,
    errorMsg,
    isDragging,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    handleCompress,
    handleReset,
  }
}
