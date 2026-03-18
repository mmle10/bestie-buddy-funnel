'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step8Video() {
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
          עם בסטי ואמיגו הילדים יותר בטוחים שמחים חברותיים משתפים רגועים ולומדים
        </p>
      </div>

      <div className="aspect-video bg-brand-primary/20 rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          src="/Happy-kids.mov"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-contain"
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
