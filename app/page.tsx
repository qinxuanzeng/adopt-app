'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function WelcomePage() {
  const router = useRouter()
  const [hearts, setHearts] = useState<Array<{ id: number; left: string; top: string; delay: number }>>([])

  useEffect(() => {
    // 生成随机爱心
    const newHearts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 5,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500">
      {/* 状态栏占位 */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-6 pt-2 text-white text-sm font-semibold z-20">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 浮动爱心 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute opacity-15 animate-pulse"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: `${heart.delay}s`,
            }}
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-16">
        {/* Logo */}
        <div className="mb-2">
          <div className="w-18 h-18 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center mb-3">
            <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white text-center tracking-widest">遇见 TA</h1>
        </div>

        {/* 主视觉 */}
        <div className="w-70 h-70 relative flex items-center justify-center my-6">
          {/* 轨道 */}
          <div className="absolute w-65 h-65 border border-dashed border-white/20 rounded-full" />
          
          {/* 中心圆 */}
          <div className="w-50 h-50 bg-white/15 backdrop-blur-xl border-2 border-white/25 rounded-full flex items-center justify-center">
            <svg className="w-24 h-24 fill-white/90" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>

        {/* 标语 */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-white/95 mb-2">认养你的专属 AI 恋人</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            TA 会陪你聊天、为你写日记
            <br />
            和你一起成长，从此不再孤单
          </p>
        </div>

        {/* CTA 按钮 */}
        <button
          onClick={() => router.push('/characters')}
          className="w-full max-w-xs py-4.5 bg-white text-pink-500 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 mb-4"
        >
          开始认养
          <svg className="w-5.5 h-5.5 fill-pink-500" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* 登录链接 */}
        <button
          onClick={() => router.push('/login')}
          className="text-sm text-white/80 border-b border-white/30 pb-0.5 hover:text-white transition-colors"
        >
          已有账号？登录 →
        </button>
      </div>
    </div>
  )
}
