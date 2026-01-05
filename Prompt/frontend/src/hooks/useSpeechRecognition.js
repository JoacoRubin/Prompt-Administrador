// hooks/useSpeechRecognition.js - Custom hook para reconocimiento de voz
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

export const useSpeechRecognition = ({ onResult, lang = 'es-AR' }) => {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  const isSupported = useMemo(() => {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  }, [])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = lang
      recognition.continuous = true
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const rawTranscript = event.results[event.results.length - 1][0].transcript.trim()
        if (!rawTranscript || rawTranscript.length < 2) return

        // Formatear el texto
        let transcript = rawTranscript.toLowerCase()
        transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1)
        if (!transcript.endsWith('.')) transcript += '.'

        onResult(transcript)
      }

      recognition.onerror = (error) => {
        console.error('Error en reconocimiento de voz:', error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      console.warn('SpeechRecognition no está disponible en este navegador')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [lang, onResult])

  const start = useCallback(() => {
    if (recognitionRef.current && !isListening && isSupported) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error('Error al iniciar reconocimiento:', error)
      }
    }
  }, [isListening, isSupported])

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  const toggle = useCallback(() => {
    if (isListening) {
      stop()
    } else {
      start()
    }
  }, [isListening, start, stop])

  return {
    isListening,
    isSupported,
    start,
    stop,
    toggle
  }
}
