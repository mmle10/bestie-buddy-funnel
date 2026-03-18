'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'
import Logo from '@/components/shared/Logo'
import Characters from '@/components/shared/Characters'
import ProgressBar from '@/components/shared/ProgressBar'
import GiftAnimation from '@/components/shared/GiftAnimation'

import Step1Age from '@/components/steps/Step1Age'
import Step2Name from '@/components/steps/Step2Name'
import Step3Parent from '@/components/steps/Step3Parent'
import Step4Recommendations from '@/components/steps/Step4Recommendations'
import Step5HowItWorks from '@/components/steps/Step5HowItWorks'
import Step6ProgressGraph from '@/components/steps/Step6ProgressGraph'
import Step7Emotion from '@/components/steps/Step7Emotion'
import Step8Video from '@/components/steps/Step8Video'
import Step9Interests from '@/components/steps/Step9Interests'
import Step10Personalization from '@/components/steps/Step10Personalization'
import Step11Safety from '@/components/steps/Step11Safety'
import Step12EmotionalSupport from '@/components/steps/Step12EmotionalSupport'
import Step13FreeTrial from '@/components/steps/Step13FreeTrial'
import Step1490DayGraph from '@/components/steps/Step1490DayGraph'
import Step15Purchase from '@/components/steps/Step15Purchase'

const STEPS = [
  Step1Age,
  Step2Name,
  Step3Parent,
  Step4Recommendations,
  Step5HowItWorks,
  Step6ProgressGraph,
  Step7Emotion,
  Step8Video,
  Step9Interests,
  Step10Personalization,
  Step11Safety,
  Step12EmotionalSupport,
  Step13FreeTrial,
  Step1490DayGraph,
  Step15Purchase,
]

export default function Funnel() {
  const { currentStep, progress } = useFunnel()
  const StepComponent = STEPS[currentStep - 1]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-brand-primary/5 to-white pt-10 md:pt-16 pb-10 px-4">
      <Logo />
      <Characters />

      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <ProgressBar progress={progress} />
          <GiftAnimation progress={progress} />
        </div>

        <AnimatePresence mode="wait">
          <StepComponent key={currentStep} />
        </AnimatePresence>
      </div>
    </div>
  )
}
