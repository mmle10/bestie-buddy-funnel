'use client'

import { motion } from 'framer-motion'

interface GiftAnimationProps {
  progress: number
  /** When true, gift "pops" more to grab attention (e.g. when user focuses/fills form fields) */
  isHighlighted?: boolean
}

export default function GiftAnimation({ progress, isHighlighted = false }: GiftAnimationProps) {
  return (
    <motion.div
      className="inline-block text-3xl"
      animate={{
        scale: isHighlighted ? [1, 1.5, 1] : [1, 1.2, 1],
        rotate: isHighlighted ? [0, 12, -12, 0] : [0, 5, -5, 0],
      }}
      transition={{
        duration: isHighlighted ? 0.5 : 2,
        repeat: isHighlighted ? 0 : Infinity,
        ease: 'easeInOut',
        repeatDelay: 1,
      }}
    >
      🎁
    </motion.div>
  )
}
