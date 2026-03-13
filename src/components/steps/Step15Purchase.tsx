'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'
import { saveFunnelResponse } from '@/lib/supabase'

const PLANS = [
  {
    id: '12months' as const,
    icon: '👑',
    title: 'שימור הביטחון העצמי ומרחב שיתופי מעצים 24/7',
    oldPrice: '62 ₪',
    newPrice: '49 ₪',
    period: 'לחודש',
    total: '599 ₪',
    coupon: '25%',
  },
  {
    id: '3months' as const,
    icon: '⚡',
    title: 'בניית ביטחון עצמי',
    oldPrice: '125 ₪',
    newPrice: '99 ₪',
    period: 'לחודש',
    total: '299 ₪',
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
      setError('שגיאה בשמירה. נסה שוב.')
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
        <h2 className="text-2xl font-bold">תודה רבה!</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          קיבלנו את הפרטים שלך. בדוק את המייל <strong>{data.email}</strong> לשלבים הבאים להשלמת המנוי ולהתחלת 7 הימים בחינם.
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
        <h2 className="text-xl font-bold text-center">בחירת מנוי</h2>
        <div className="bg-brand-primary/5 rounded-xl p-4 text-sm text-gray-700 space-y-2">
          <p className="font-medium text-brand-primary">מה תקבלו:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>גישה ל-BUDDY – חברים דיגיטליים חכמים שמחזקים ומעצימים</li>
            <li>כלים מעשיים לחוסן רגשי וביטחון חברתי</li>
            <li>תוכן מותאם אישית לפי תחומי העניין של הילד/ה</li>
            <li>מרחב תומך 24/7 לשיתוף וצמיחה</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600 text-center">
          נסו 7 ימים בחינם • ניתן לבטל בתוך 7 ימים מהרכישה • חיוב לאחר תקופת הניסיון
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
              <p className="text-sm text-gray-600 mt-1">סה&quot;כ: {plan.total}</p>
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
          <p className="font-medium">איך עובדת תקופת הניסיון</p>
          <p><strong>שלב 1 – היום:</strong> לאחר הרכישה מקבלים קישור התחברות ל-BUDDY עם הוראות שימוש</p>
          <p><strong>שלב 2 – תוך 7 ימים:</strong> תוכלו לשלוח הודעת ביטול ולקבל החזר מלא</p>
        </div>
        <p className="text-xs text-gray-500 text-center">
          ניתן לבטל בתוך 7 ימים מהרכישה ולקבל החזר מלא
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
        {isSubmitting ? 'מעבד...' : 'המשך לרכישה'}
      </motion.button>
    </motion.div>
  )
}
