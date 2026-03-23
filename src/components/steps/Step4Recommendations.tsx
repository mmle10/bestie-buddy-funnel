'use client'

import { useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const TESTIMONIAL_IMAGES = [1, 2, 3, 4, 5]

export default function Step4Recommendations() {
  const { nextStep } = useFunnel()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const audioCtxRef = useRef<AudioContext | null>(null)
  const lastIndexRef = useRef<number | null>(null)

  const playTransitionSound = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      if (!audioCtxRef.current) audioCtxRef.current = new AudioContextClass()
      const ctx = audioCtxRef.current

      // Resume in case the browser suspended it.
      // If autoplay is blocked, this will throw and we simply ignore.
      ctx.resume?.()

      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(740, ctx.currentTime)

      // Quick, subtle “tick” sound
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)

      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.1)
    } catch {
      // Ignore sound errors (autoplay restrictions, unsupported browser, etc.)
    }
  }, [])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const interval = setInterval(scrollNext, 4000)
    return () => clearInterval(interval)
  }, [scrollNext])

  // Play the sound whenever the active slide changes (autoplay + manual swipe).
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      // selectedScrollSnap() gives the slide "index" (normalized snap) Embla is currently showing.
      const index = emblaApi.selectedScrollSnap()
      if (lastIndexRef.current === index) return
      lastIndexRef.current = index
      playTransitionSound()
    }

    // Initialize so the first select doesn't immediately trigger a sound.
    try {
      lastIndexRef.current = emblaApi.selectedScrollSnap()
    } catch {
      // no-op
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, playTransitionSound])

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close()
      } catch {
        // no-op
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold">הורים מספרים ש…</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {TESTIMONIAL_IMAGES.map((id) => (
            <div
              key={id}
              className="flex-[0_0_75%] min-w-0 flex-shrink-0"
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={`/${id}.png`}
                  alt={`המלצה ${id}`}
                  width={400}
                  height={500}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0" aria-hidden />
        </div>
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
