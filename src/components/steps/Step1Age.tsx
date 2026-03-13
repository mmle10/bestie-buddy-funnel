'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const AGES = [11, 12, 13, 14, 15, 16]

export default function Step1Age() {
  const { data, setData, nextStep } = useFunnel()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">What is your child&apos;s age?</h2>
        <p className="text-gray-600 text-sm">This helps us tailor the activities</p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {AGES.map((age) => (
          <motion.button
            key={age}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setData({ childAge: age })
              nextStep()
            }}
            className={`py-4 px-4 rounded-xl border-2 font-semibold transition-colors ${
              data.childAge === age
                ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                : 'border-gray-200 hover:border-brand-primary/50'
            }`}
          >
            {age}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
