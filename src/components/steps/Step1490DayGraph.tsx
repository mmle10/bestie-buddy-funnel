'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step1490DayGraph() {
  const { data, nextStep } = useFunnel()
  const name = data.childName || 'הילד/ה'
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.play().catch(() => {})
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold">
          כך תראה ההתקדמות של {name} ב-90 יום בלבד
        </h2>
      </div>

      <div className="w-full">
        <div className="aspect-[2/1] w-full rounded-2xl overflow-hidden bg-brand-primary/10">
          <video
            ref={videoRef}
            src="/gragh-14.mov"
            autoPlay
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="px-8 py-3 bg-brand-primary text-white rounded-xl font-medium"
        >
          המשך
        </motion.button>
      </div>
    </motion.div>
  )
}
