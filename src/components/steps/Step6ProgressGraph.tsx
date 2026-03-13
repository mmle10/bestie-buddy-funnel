'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const LEVELS = [
  'ביטחון עצמי',
  'ביטחון עצמי וחוסן רגשי',
  'ביטחון עצמי חוסן רגשי ורוגע פנימי',
  'ביטחון עצמי חוסן רגשי רוגע פנימי תחושת שייכות',
  'ביטחון עצמי חוסן רגשי רוגע פנימי תחושת שייכות יוזמה חברתית',
  'ביטחון עצמי חוסן רגשי רוגע פנימי תחושת שייכות יוזמה חברתית דימוי עצמי ריכוז ורוגע לימודי',
]

export default function Step6ProgressGraph() {
  const { data, nextStep } = useFunnel()
  const name = data.childName || 'הילד/ה'

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">
          מה תהיה ההתקדמות של {name}?
        </h2>
        <p className="text-sm text-gray-600">
          בזכות הכלים הפרקטיים שנבנו ע&quot;י מאמנים מוסכמים בשיטת הנ.ל.פ
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
          המשך
        </motion.button>
      </div>
    </motion.div>
  )
}
