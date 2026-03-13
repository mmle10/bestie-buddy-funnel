'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'
import GiftAnimation from '@/components/shared/GiftAnimation'

export default function Step13FreeTrial() {
  const { data, setData, nextStep } = useFunnel()
  const [email, setEmail] = useState(data.email || '')
  const [phone, setPhone] = useState(data.phone || '')
  const [isFormActive, setIsFormActive] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && phone.trim()) {
      setData({ email: email.trim(), phone: phone.trim() })
      nextStep()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">קבלו במתנה 7 ימים בחינם</h2>
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

        <div className="flex justify-center py-4">
          <GiftAnimation progress={100} isHighlighted={isFormActive || (!!email && !!phone)} />
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
