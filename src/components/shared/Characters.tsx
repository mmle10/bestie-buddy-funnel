'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Characters() {
  return (
    <div className="w-full flex justify-center mt-2 mb-6">
      <div className="flex items-center gap-4" dir="rtl">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative" style={{ willChange: 'transform' }}>
              <Image
                src="/bestie.png"
                alt="Bestie"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="text-black font-medium mt-2">בסטי</div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: 0.1,
            }}
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative " style={{ willChange: 'transform' }}>
              <Image
                src="/amigo.png"
                alt="Amigo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-black font-medium mt-2">אמיגו</div>
          </motion.div>
        </motion.div>

        <div className="text-black font-bold leading-tight text-right">
        מנטורים חכמים לטיפוח ביטחון עצמי והתנהגות חיובית
        </div>
      </div>
    </div>
  )
}
