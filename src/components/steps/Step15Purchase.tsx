'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'
import { saveFunnelResponse } from '@/lib/supabase'

const PLANS = [
  {
    id: '12months' as const,
    icon: '👑',
    title: 'Confidence & supportive space 24/7',
    oldPrice: '$62',
    newPrice: '$49',
    period: '/month',
    total: '$599 total',
    coupon: '25%',
  },
  {
    id: '3months' as const,
    icon: '⚡',
    title: 'Building self-confidence',
    oldPrice: '$125',
    newPrice: '$99',
    period: '/month',
    total: '$299 total',
    coupon: '25%',
  },
]

export default function Step15Purchase() {
  const { data, setData } = useFunnel()
  const [selectedPlan, setSelectedPlan] = useState<'12months' | '3months' | null>(
    data.selectedPlan || null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelect = (plan: '12months' | '3months') => {
    setSelectedPlan(plan)
    setData({ selectedPlan: plan })
  }

  const handlePurchase = async () => {
    if (!selectedPlan) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await saveFunnelResponse({
        child_age: data.childAge,
        child_name: data.childName,
        child_gender: data.childGender,
        is_parent: data.isParent,
        emotion_value: data.emotionValue,
        interests: data.interests,
        safety_answer: data.safetyAnswer,
        emotional_support_answer: data.emotionalSupportAnswer,
        email: data.email,
        phone: data.phone,
        selected_plan: selectedPlan,
      })

      const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL
      if (paymentUrl) {
        const url = new URL(paymentUrl)
        url.searchParams.set('plan', selectedPlan)
        if (data.email) url.searchParams.set('email', data.email)
        if (response?.id) url.searchParams.set('funnel_id', String(response.id))
        window.location.href = url.toString()
        return
      }

      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6 py-8"
      >
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold">Thank you!</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          We&apos;ve received your information. Check your email at <strong>{data.email}</strong> for next steps to complete your subscription and start your 7-day free trial.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">Choose a plan</h2>
        <div className="bg-brand-primary/5 rounded-xl p-4 text-sm text-gray-700 space-y-2">
          <p className="font-medium text-brand-primary">What you receive:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Access to BUDDY – smart digital friends that strengthen and empower</li>
            <li>Practical tools for emotional resilience and social confidence</li>
            <li>Personalized content based on your child&apos;s interests</li>
            <li>24/7 supportive space for sharing and growth</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Try 7 days free • Cancel within 7 days of purchase • Payment after trial ends
        </p>
      </div>

      <div className="grid gap-4">
        {PLANS.map((plan) => (
          <motion.button
            key={plan.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(plan.id)}
            className={`p-6 rounded-2xl border-2 text-left shadow-sm transition-all ${
              selectedPlan === plan.id
                ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary'
                : 'border-gray-200 hover:border-brand-primary/50'
            }`}
          >
            <div className="relative">
              <span className="absolute -top-2 right-0 bg-brand-accent text-brand-dark text-xs font-bold px-2 py-0.5 rounded">
                {plan.coupon}
              </span>
              <div className="text-2xl mb-2">{plan.icon}</div>
              <p className="font-medium mb-2">{plan.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-400 line-through text-sm">
                  {plan.oldPrice}
                </span>
                <span className="text-xl font-bold text-brand-primary">
                  {plan.newPrice} {plan.period}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Total: {plan.total}</p>
              {selectedPlan === plan.id && (
                <div className="absolute bottom-0 right-0 text-brand-primary text-2xl font-bold">
                  ✓
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-3">
          <p className="font-medium">How the trial works</p>
          <p><strong>Step 1 – Today:</strong> After purchase you receive a BUDDY login link with instructions</p>
          <p><strong>Step 2 – Within 7 days:</strong> You can send a cancellation message and get a full refund</p>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Cancel within 7 days of purchase for a full refund
        </p>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePurchase}
        disabled={!selectedPlan || isSubmitting}
        className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Continue to checkout'}
      </motion.button>
    </motion.div>
  )
}
