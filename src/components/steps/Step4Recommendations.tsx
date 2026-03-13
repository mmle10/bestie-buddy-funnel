'use client'

import { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'

const TESTIMONIAL_IMAGES = [1, 2, 3, 4, 5]

export default function Step4Recommendations() {
  const { nextStep } = useFunnel()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const interval = setInterval(scrollNext, 4000)
    return () => clearInterval(interval)
  }, [scrollNext])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold">What families say about us</h2>
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
                  alt={`Testimonial from family ${id}`}
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
          Continue
        </motion.button>
      </div>
    </motion.div>
  )
}
