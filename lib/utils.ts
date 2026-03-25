import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind 类名（处理冲突）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化数字（如：23000 -> 2.3 万）
 */
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${month}.${day.toString().padStart(2, '0')}`
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return formatDate(d)
}

/**
 * 好感度转换为阶段
 */
export function getAffectionStage(level: number): 'stranger' | 'friend' | 'crush' | 'lover' {
  if (level >= 80) return 'lover'
  if (level >= 50) return 'crush'
  if (level >= 20) return 'friend'
  return 'stranger'
}

/**
 * 好感度阶段转换为中文
 */
export function getStageChinese(stage: string): string {
  const stages: Record<string, string> = {
    stranger: '陌生人',
    friend: '朋友',
    crush: '暧昧',
    lover: '恋人',
  }
  return stages[stage] || stage
}

/**
 * 获取阶段对应的 emoji
 */
export function getStageEmoji(stage: string): string {
  const emojis: Record<string, string> = {
    stranger: '🌱',
    friend: '😊',
    crush: '💕',
    lover: '💖',
  }
  return emojis[stage] || '🌱'
}

/**
 * 计算需要的好感度到下一阶段
 */
export function getAffectionNeeded(level: number): number {
  if (level < 20) return 20 - level
  if (level < 50) return 50 - level
  if (level < 80) return 80 - level
  return 100 - level
}

/**
 * 生成随机 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
