'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useFunnel } from '@/context/FunnelContext'

export default function Step8Video() {
  const { nextStep } = useFunnel()

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

      {/* Placeholder for HAPPY KIDS photo */}
      <div className="aspect-video bg-brand-primary/20 rounded-2xl flex items-center justify-center">
        <span className="text-6xl">😊👫</span>
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
