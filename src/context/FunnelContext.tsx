'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface FunnelData {
  childAge?: number
  childName?: string
  childGender?: 'male' | 'female'
  isParent?: boolean
  emotionValue?: number
  interests?: string[]
  safetyAnswer?: string
  emotionalSupportAnswer?: string
  email?: string
  phone?: string
  selectedPlan?: '12months' | '3months'
}

interface FunnelContextType {
  currentStep: number
  totalSteps: number
  data: FunnelData
  setData: (data: Partial<FunnelData>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  progress: number
}

const TOTAL_STEPS = 15

const FunnelContext = createContext<FunnelContextType | null>(null)

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setDataState] = useState<FunnelData>({})

  const setData = useCallback((updates: Partial<FunnelData>) => {
    setDataState((prev) => ({ ...prev, ...updates }))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, TOTAL_STEPS)))
  }, [])

  const progress = (currentStep / TOTAL_STEPS) * 100

  return (
    <FunnelContext.Provider
      value={{
        currentStep,
        totalSteps: TOTAL_STEPS,
        data,
        setData,
        nextStep,
        prevStep,
        goToStep,
        progress,
      }}
    >
      {children}
    </FunnelContext.Provider>
  )
}

export function useFunnel() {
  const ctx = useContext(FunnelContext)
  if (!ctx) throw new Error('useFunnel must be used within FunnelProvider')
  return ctx
}
