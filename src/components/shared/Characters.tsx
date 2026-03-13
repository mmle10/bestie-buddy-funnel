'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Characters() {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-end z-10 pointer-events-none">
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Placeholder for Bestie - replace with actual image */}
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-primary/30 flex items-center justify-center text-2xl"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          😊
        </motion.div>
        {/* Placeholder for Amigo - replace with actual image */}
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-secondary/30 flex items-center justify-center text-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          🤝
        </motion.div>
      </motion.div>
    </div>
  )
}
