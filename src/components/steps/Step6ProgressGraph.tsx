'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step6ProgressGraph() {
  const { data, nextStep } = useFunnel()
  const name = data.childName || 'הילד/ה'
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // Attempt play in case the browser waits until metadata loads.
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
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold" style={{ direction: 'rtl' }}>
          מה תהיה ההתקדמות של {name}<span dir="ltr">?</span>
        </h2>
        <p className="text-sm text-gray-600">
          בזכות הכלים הפרקטיים שנבנו ע&quot;י מאמנים מוסכמים בשיטת הנ.ל.פ
        </p>
      </div>

      <div className="w-full">
        <div className="aspect-[4/6] w-full rounded-2xl overflow-hidden bg-brand-primary/10">
          <video
            ref={videoRef}
            src="/gragh.mov"
            autoPlay
            muted
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
