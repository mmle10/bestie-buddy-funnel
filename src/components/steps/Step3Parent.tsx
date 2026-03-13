'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step3Parent() {
  const { data, setData, nextStep } = useFunnel()

  const handleSelect = (isParent: boolean) => {
    setData({ isParent })
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
        <h2 className="text-xl font-bold">Are you a parent?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(true)}
          className={`py-6 rounded-xl border-2 font-medium text-lg ${
            data.isParent === true
              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
              : 'border-gray-200 hover:border-brand-primary/50'
          }`}
        >
          Yes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(false)}
          className={`py-6 rounded-xl border-2 font-medium text-lg ${
            data.isParent === false
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
