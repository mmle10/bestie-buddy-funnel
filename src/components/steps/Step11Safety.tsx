'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step11Safety() {
  const { data, setData, nextStep } = useFunnel()
  const name = data.childName || 'your child'

  const handleSelect = (answer: string) => {
    setData({ safetyAnswer: answer })
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
          Does everything {name} does on their phone really strengthen, empower and help them grow?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('yes')}
          className={`py-6 rounded-xl border-2 font-medium text-lg ${
            data.safetyAnswer === 'yes'
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
            data.safetyAnswer === 'no'
              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
              : 'border-gray-200 hover:border-brand-primary/50'
          }`}
        >
          No
        </motion.button>
      </div>
    </motion.div>
  )
}
