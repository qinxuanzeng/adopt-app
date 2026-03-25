import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Mock 客户端用于演示（环境变量未配置时）
const mockSupabase = {
  auth: {
    signInWithOtp: async () => ({ error: null }),
    verifyOtp: async () => ({ data: { user: { id: 'demo-user' } }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({
          limit: () => ({
            select: () => ({
              data: [],
              error: null,
            }),
          }),
        }),
      }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  }),
}

// 仅在环境变量有效时创建真实客户端
export const supabase = supabaseUrl.startsWith('http')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabase as any

// 类型定义
export interface User {
  id: string
  email?: string
  phone?: string
  nickname: string
  avatar_url?: string
  subscription_tier: 'free' | 'premium' | 'vip'
  created_at: string
  last_active_at: string
}

export interface Character {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  personality: string
  backstory?: string
  avatar_url: string
  voice_style?: string
  base_prompt: string
  tier: 'free' | 'premium'
  popularity: number
  created_at: string
}

export interface Adoption {
  id: string
  user_id: string
  character_id: string
  custom_name?: string
  affection_level: number
  stage: 'stranger' | 'friend' | 'crush' | 'lover'
  adopted_at: string
  last_interaction_at: string
  character?: Character
}

export interface Conversation {
  id: string
  adoption_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata?: Record<string, any>
  created_at: string
}

export interface Gift {
  id: string
  name: string
  description?: string
  icon_emoji?: string
  cost: number
  affection_bonus: number
  tier: 'common' | 'rare' | 'legendary'
}

export interface DiaryEntry {
  id: string
  adoption_id: string
  content: string
  mood?: 'happy' | 'sad' | 'excited' | 'calm' | 'touched'
  date: string
  created_at: string
}
