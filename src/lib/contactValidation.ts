/** Basic RFC‑5322–style check — good enough for funnel UX */
export function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (v.length < 5 || v.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const PHONE_DIGITS = /\D/g

/** Digits only for length / pattern checks */
export function phoneDigits(value: string): string {
  return value.replace(PHONE_DIGITS, '')
}

/**
 * Israeli-oriented: mobile 05x / 5x / 972…, or landline 0[2-9]…
 * Requires 9–15 digits total (E.164-style upper bound).
 */
export function isValidPhone(value: string): boolean {
  const d = phoneDigits(value)
  if (d.length < 9 || d.length > 15) return false
  if (/^05\d{8}$/.test(d)) return true
  if (/^5\d{8}$/.test(d)) return true
  if (/^972\d{8,10}$/.test(d)) return true
  if (/^0[2-9]\d{7,8}$/.test(d)) return true
  return false
}
