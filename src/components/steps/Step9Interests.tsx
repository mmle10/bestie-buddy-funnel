'use client'

import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const INTERESTS = [
  'Sports / Dance',
  'Art / Drawing',
  'Music',
  'Video games',
  'Cooking & Baking',
  'TV / Theatre',
  'Other',
]

export default function Step9Interests() {
  const { data, setData, nextStep } = useFunnel()
  const name = data.childName || 'your child'
  const selected = data.interests || []

  const toggle = (interest: string) => {
    const next = selected.includes(interest)
      ? selected.filter((i) => i !== interest)
      : [...selected, interest]
    setData({ interests: next })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold">What are {name}&apos;s hobbies?</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INTERESTS.map((interest) => (
          <motion.button
            key={interest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(interest)}
            className={`py-4 px-4 rounded-xl border-2 text-sm font-medium ${
              selected.includes(interest)
                ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                : 'border-gray-200 hover:border-brand-primary/50'
            }`}
          >
            {interest}
          </motion.button>
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
