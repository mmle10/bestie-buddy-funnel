import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase: SupabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as SupabaseClient)

export interface FunnelResponse {
  id?: string
  created_at?: string
  child_age?: number
  child_name?: string
  child_gender?: 'male' | 'female'
  is_parent?: boolean
  emotion_value?: number
  interests?: string[]
  safety_answer?: string
  emotional_support_answer?: string
  email?: string
  phone?: string
  selected_plan?: '12months' | '3months'
  [key: string]: unknown
}

export async function saveFunnelResponse(data: FunnelResponse) {
  if (!supabase) {
    console.warn('Supabase not configured - data not saved')
    return { id: 'local', ...data }
  }
  const { data: result, error } = await supabase
    .from('funnel_responses')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateFunnelResponse(id: string, data: Partial<FunnelResponse>) {
  if (!supabase) return null
  const { data: result, error } = await supabase
    .from('funnel_responses')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return result
}
