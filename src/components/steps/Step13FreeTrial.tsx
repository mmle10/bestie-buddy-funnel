'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step13FreeTrial() {
  const { data, setData, nextStep } = useFunnel()
  const [email, setEmail] = useState(data.email || '')
  const [phone, setPhone] = useState(data.phone || '')
  const [isFormActive, setIsFormActive] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [giftJumpKey, setGiftJumpKey] = useState(0)

  const isFilled = useMemo(() => {
    return email.trim().length > 0 && phone.trim().length > 0
  }, [email, phone])

  const giftHighlighted = isFormActive || isFilled

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && phone.trim()) {
      setData({ email: email.trim(), phone: phone.trim() })
      nextStep()
    }
  }

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.play().catch(() => {
      // Autoplay may be blocked until the first user gesture; ignore.
    })
  }, [])

  // Trigger a "pop/jump" animation only when highlight turns on.
  const prevHighlightedRef = useRef<boolean>(false)
  useEffect(() => {
    if (giftHighlighted && !prevHighlightedRef.current) {
      setGiftJumpKey((k) => k + 1)
    }
    prevHighlightedRef.current = giftHighlighted
  }, [giftHighlighted])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">קבלו במתנה 7 ימים להתנסות</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => {
            if (blurTimeout.current) clearTimeout(blurTimeout.current)
            setIsFormActive(true)
          }}
          onBlur={() => {
            blurTimeout.current = setTimeout(() => setIsFormActive(false), 100)
          }}
          placeholder="כתובת מייל"
          required
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-brand-primary outline-none"
          dir="ltr"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => {
            if (blurTimeout.current) clearTimeout(blurTimeout.current)
            setIsFormActive(true)
          }}
          onBlur={() => {
            blurTimeout.current = setTimeout(() => setIsFormActive(false), 100)
          }}
          placeholder="מספר טלפון"
          required
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-brand-primary outline-none"
          dir="ltr"
        />

        <div className="flex justify-center">
          <motion.div
            key={giftJumpKey}
            animate={
              giftHighlighted
                ? { y: [0, -14, 0], rotate: [0, -6, 0], scale: [1, 1.08, 1] }
                : { y: 0, rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-24 h-36">
              <video
                ref={videoRef}
                src="/Pop-Up%20Gift.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-brand-primary text-white rounded-xl font-medium"
        >
          המשך
        </motion.button>
      </form>
    </motion.div>
  )
}
