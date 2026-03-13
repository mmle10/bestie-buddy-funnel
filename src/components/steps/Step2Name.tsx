'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step2Name() {
  const { data, setData, nextStep } = useFunnel()
  const [name, setName] = useState(data.childName || '')
  const [showGender, setShowGender] = useState(!!data.childName)

  const handleNameChange = (value: string) => {
    setName(value)
    const trimmed = value.trim()
    if (trimmed.length >= 3) {
      setData({ childName: trimmed })
      setShowGender(true)
    } else {
      setShowGender(false)
    }
  }

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setData({ childGender: gender })
    nextStep()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold">מה שם הילד/ה?</h2>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="הקלידו את השם"
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-brand-primary outline-none text-center"
        />

        {showGender && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenderSelect('male')}
              className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 font-medium ${
                data.childGender === 'male'
                  ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                  : 'border-gray-200 hover:border-brand-primary/50'
              }`}
            >
              <span className="text-4xl">👦</span>
              <span>בן</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenderSelect('female')}
              className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 font-medium ${
                data.childGender === 'female'
                  ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                  : 'border-gray-200 hover:border-brand-primary/50'
              }`}
            >
              <span className="text-4xl">👧</span>
              <span>בת</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
