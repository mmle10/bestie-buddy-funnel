'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step10Personalization() {
  const { nextStep } = useFunnel()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.play().catch(() => {
      // Autoplay may be blocked until the first user gesture; ignore.
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <p className="text-lg">
          בסטי ואמיגו מתחברים לתחומי העניין של הילדים ומזכירים להם אותם ברגעי הצורך להנעה ומוטיבציה חיובית
        </p>
      </div>

      <div className="aspect-video rounded-2xl overflow-hidden bg-brand-primary/20">
        <video
          ref={videoRef}
          src="/bestie-and-amigo.mov"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
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
