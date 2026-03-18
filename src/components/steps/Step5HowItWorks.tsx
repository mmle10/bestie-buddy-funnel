'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const BOXES = [
  { id: 1, text: 'במשהו טוב שקרה לך ☺️', video: '/videos/Box1.mp4' },
  { id: 2, text: 'במשהו שפחות טוב או משהו שפגע בך 🙁', video: '/videos/Box2.mp4' },
  { id: 3, text: 'בשאלה שיש לך התלבטות לגביה 🤔', video: '/videos/Box3.mp4' },
  { id: 4, text: 'לא בא לך לשתף כלום ו.. זה גם בסדר 🫶', video: '/videos/Box4.mp4' },
]

export default function Step5HowItWorks() {
  const { data, nextStep } = useFunnel()
  const [videoPopup, setVideoPopup] = useState<string | null>(null)

  const name = data.childName || 'הילד/ה'
  const isFemale = data.childGender === 'female'
  const introText = isFemale
    ? `כדי להראות לך איך ${name} יכולה להתחזק ולהתעצם כבר מהיום הראשון
יש ללחוץ על אחת מהדוגמאות ש ${name} יכולה לבחור ולשתף את בסטי`
    : `כדי להראות לך איך ${name} יכול להתחזק ולהתעצם כבר מהיום הראשון
יש ללחוץ על אחת מהדוגמאות ש${name} יכול לבחור ולשתף את אמיגו`

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <p className="text-lg whitespace-pre-line">{introText}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {BOXES.map((box) => (
          <motion.button
            key={box.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVideoPopup(box.video)}
            className="p-6 rounded-xl bg-brand-primary/20 border-2 border-brand-primary/30 hover:bg-brand-primary/30 text-center font-medium flex items-center justify-center"
          >
            {box.text}
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
          המשך
        </motion.button>
      </div>

      <AnimatePresence>
        {videoPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setVideoPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black rounded-xl overflow-hidden max-w-lg w-full"
            >
              <video
                src={videoPopup}
                controls
                autoPlay
                className="w-full"
                onEnded={() => setVideoPopup(null)}
              />
              <button
                onClick={() => setVideoPopup(null)}
                className="w-full py-2 text-white bg-gray-800"
              >
                סגור
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
