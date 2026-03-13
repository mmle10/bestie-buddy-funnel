'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const POPUP_TEXT =
  'That\'s exactly why BUDDY was created – smart digital friends who act as mentors, strengthen and empower, give tools for social challenges, and are there simply to share what kids want to share'

export default function Step12EmotionalSupport() {
  const { data, setData, nextStep } = useFunnel()
  const [showPopup, setShowPopup] = useState(false)
  const name = data.childName || 'your child'

  const handleSelect = (answer: string) => {
    setData({ emotionalSupportAnswer: answer })
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
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
        <h2 className="text-lg font-bold">
          Is it important to you that {name} has tools to confidently handle social situations?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('yes')}
          className={`py-6 rounded-xl border-2 font-medium text-lg ${
            data.emotionalSupportAnswer === 'yes'
              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
              : 'border-gray-200 hover:border-brand-primary/50'
          }`}
        >
          Yes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('no')}
          className={`py-6 rounded-xl border-2 font-medium text-lg ${
            data.emotionalSupportAnswer === 'no'
              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
              : 'border-gray-200 hover:border-brand-primary/50'
          }`}
        >
          No
        </motion.button>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md shadow-xl"
            >
              <p className="text-center mb-6">{POPUP_TEXT}</p>
              <button
                onClick={handleClosePopup}
                className="w-full py-3 bg-brand-primary text-white rounded-xl font-medium"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
