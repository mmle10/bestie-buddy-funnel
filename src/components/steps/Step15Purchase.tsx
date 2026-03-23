'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFunnel } from '@/context/FunnelContext'
import { saveFunnelResponse } from '@/lib/supabase'

const PLANS = [
  {
    id: '12months' as const,
    icon: '👑',
    title: 'מרחב שיתופי מעצים  24/7 לשיפור הביטחון העצמי ולטיפוח התנהגויות חיוביות ',
    oldPrice: '62 ₪',
    newPrice: '49 ₪',
    period: 'לחודש',
    coupon: '25%',
  },
]

export default function Step15Purchase() {
  const { data, setData } = useFunnel()
  const [selectedPlan, setSelectedPlan] = useState<'12months'>('12months')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelect = (plan: '12months') => {
    setSelectedPlan(plan)
    setData({ selectedPlan: plan })
  }

  const handlePurchase = async () => {

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

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center space-y-6 py-8"
        >
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold">
            <span dir="ltr">!</span> תודה רבה
          </h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            כבר ישלח אלייך מייל התחברות <span dir="ltr">BUDDY</span> ל עם הוראות שימוש ופרטי התקשרות למרכז התמיכה שלנו בעת הצורך
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* <h2 className="text-xl font-bold text-center">בחירת מנוי</h2> */}
          </div>

          <div className="grid gap-4">
            {PLANS.map((plan) => (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(plan.id)}
                className="p-6 rounded-2xl border-2 text-left shadow-sm transition-all border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary"
              >
                <div className="relative flex flex-col items-start">
                  <span className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-xs font-bold px-2 py-0.5 rounded">
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
                  <div className="absolute bottom-0 right-0 text-brand-primary text-2xl font-bold">
                    ✓
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-right">נסו 7 ימים במתנה</p>

          <div className="space-y-2 pt-2 text-right">
            <h3 className="text-sm font-bold">
              מה כלול בפנים<span dir="ltr">?</span>
            </h3>
            <p className="text-sm text-gray-700">מנטורים דיגיטליים חכמים מחזקים ומעצימים</p>
            <p className="text-sm text-gray-700">כלים מעשיים לחוסן רגשי וביטחון חברתי</p>
            <p className="text-sm text-gray-700">תוכן מותאם אישית לפי גיל {'\u00A0\u00A0'}הילד/ה</p>
            <p className="text-sm text-gray-700">מרחב תומך ובטוח 24/7 לשיתוף וצמיחה</p>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePurchase}
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'מעבד...' : 'המשך לרכישה'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
