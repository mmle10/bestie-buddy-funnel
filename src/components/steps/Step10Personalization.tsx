'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

export default function Step10Personalization() {
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
          בסטי ואמיגו מתחברים לתחומי העניין של הילדים ומזכירים להם אותם ברגעי הצורך להנעה ומוטיבציה חיובית
        </p>
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
