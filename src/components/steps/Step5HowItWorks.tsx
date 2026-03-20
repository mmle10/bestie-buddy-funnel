'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const BOXES = [
  { id: 1, text: 'במשהו שפחות טוב או משהו שפגע בך 🙁', video: '/Box-2.mp4' },
  { id: 2, text: 'במשהו טוב שקרה לך ☺️', video: '/Box-1.mp4' },
  { id: 3, text: 'לא בא לך לשתף כלום ו.. זה גם בסדר 🫶', video: '/videos/Box4.mp4' },
  { id: 4, text: 'בשאלה שיש לך התלבטות לגביה 🤔', video: '/videos/Box3.mp4' },
]

export default function Step5HowItWorks() {
  const { data, nextStep } = useFunnel()
  const [videoPopup, setVideoPopup] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (videoPopup) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [videoPopup])

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

      <dialog
        ref={dialogRef}
        onCancel={() => setVideoPopup(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setVideoPopup(null)
        }}
        className="flex w-[min(100%-2rem,24rem)]  flex-col items-center justify-center  border-0 rounded-xl black p-0 shadow-xl overflow-hidden"
      >
        {videoPopup && (
          <>
            <div className="flex flex-1 items-center justify-center bg-black">
              <video
                src={videoPopup}
                controls
                autoPlay
                className="h-full w-full object-fill"
                onEnded={() => setVideoPopup(null)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                dialogRef.current?.close()
                setVideoPopup(null)
              }}
              className="w-full py-3 font-medium text-white rounded-b-xl bg-brand-primary/60 hover:bg-brand-primary/50 transition-colors"
            >
              סגור
            </button>
          </>
        )}
      </dialog>
    </motion.div>
  )
}
