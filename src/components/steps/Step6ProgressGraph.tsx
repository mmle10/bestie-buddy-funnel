'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const LEVELS = [
  'Self confidence',
  'Self confidence & emotional resilience',
  'Self confidence, emotional resilience & inner calm',
  'Self confidence, emotional resilience, inner calm & sense of belonging',
  'Self confidence, emotional resilience, inner calm, belonging & social initiative',
  'Self confidence, emotional resilience, inner calm, belonging, social initiative, self-image, focus & academic calm',
]

export default function Step6ProgressGraph() {
  const { data, nextStep } = useFunnel()
  const name = data.childName || 'your child'

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">
          What progress will {name} make?
        </h2>
        <p className="text-sm text-gray-600">
          Thanks to practical tools built by certified coaches
        </p>
      </div>

      <div className="space-y-3">
        {LEVELS.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
              {i + 1}
            </span>
            <div className="flex-1 py-2.5 px-4 bg-brand-primary/10 rounded-xl text-sm leading-relaxed">
              {level}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="px-8 py-3 bg-brand-primary text-white rounded-xl font-medium"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  )
}
