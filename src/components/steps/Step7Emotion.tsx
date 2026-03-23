'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step7Emotion() {
  const { data, setData, nextStep } = useFunnel()
  const [value, setValue] = useState(data.emotionValue ?? 50)
  const name = data.childName || 'הילד/ה'
  const isFemale = data.childGender === 'female'
  const questionText = isFemale
    ? `מה תהיה ההרגשה של ${name} רק מהידיעה שיש מנטורים שתמיד נמצאים שם עבורה`
    : `מה תהיה ההרגשה של ${name} רק מהידיעה שיש מנטורים שתמיד נמצאים שם עבורו`

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    setValue(val)
    setData({ emotionValue: val })
  }

  const handleContinue = () => {
    setData({ emotionValue: value })
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
        <h2 className="text-lg font-bold text-center" style={{ direction: 'rtl' }}>
          {questionText}<span dir="ltr">?</span>
        </h2>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex justify-between text-base font-medium text-gray-600 mb-3">
          <span className="flex items-center gap-1">רעה <span className="text-2xl">😢</span></span>
          <span className="flex items-center gap-1"><span className="text-2xl">🙂</span> טובה</span>
        </div>

        <div className="relative py-4">
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand-primary"
              initial={false}
              animate={{ width: `${value}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleInput}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
          <motion.div
            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-white bg-brand-primary shadow-lg"
            initial={false}
            animate={{ left: `calc(${value}% - 12px)` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ pointerEvents: 'none' }}
          />
        </div>

        <p className="text-center text-4xl">
          {value < 30 ? '😢' : value < 70 ? '😐' : '🙂'}
        </p>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="px-8 py-3 bg-brand-primary text-white rounded-xl font-medium"
        >
          המשך
        </motion.button>
      </div>
    </motion.div>
  )
}
