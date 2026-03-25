'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isRegister, setIsRegister] = useState(false)

  // 发送验证码
  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      alert('请输入正确的手机号')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+86${phone}`,
      })

      if (error) throw error
      alert('验证码已发送')
      
      // 倒计时 60 秒
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // 登录/注册
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phone || !code) {
      alert('请输入手机号和验证码')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+86${phone}`,
        token: code,
        type: 'sms',
      })

      if (error) throw error
      
      // 登录成功，跳转到首页
      router.push('/characters')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen bg-background">
      {/* 状态栏 */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto h-14 flex items-center justify-between px-6 pt-2 text-gray-800 text-sm font-semibold z-50 bg-background">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 返回按钮 */}
      <button
        onClick={() => router.back()}
        className="fixed top-16 left-5 z-50 text-2xl text-gray-600"
      >
        ←
      </button>

      {/* 主内容 */}
      <div className="flex flex-col items-center justify-center h-full px-8 pt-14">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mb-3 shadow-glow">
            <svg className="w-9 h-9 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {isRegister ? '注册账号' : '登录'}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            {isRegister ? '创建一个新账号' : '欢迎回来'}
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          {/* 手机号输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              手机号
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="请输入手机号"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-pink-400 transition-colors bg-white"
              maxLength={11}
            />
          </div>

          {/* 验证码输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              验证码
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="6 位验证码"
                className="flex-1 px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-pink-400 transition-colors bg-white"
                maxLength={6}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || !phone}
                className={`px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  countdown > 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow hover:shadow-lg'
                }`}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={loading || !phone || !code}
            className={`w-full py-4 rounded-xl text-base font-bold transition-all ${
              loading || !phone || !code
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow hover:shadow-lg active:scale-98'
            }`}
          >
            {loading ? '登录中...' : isRegister ? '注册' : '登录'}
          </button>
        </form>

        {/* 切换登录/注册 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isRegister ? '已有账号？' : '还没有账号？'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-1 text-pink-400 font-medium hover:underline"
            >
              {isRegister ? '去登录' : '去注册'}
            </button>
          </p>
        </div>

        {/* 协议 */}
        <p className="mt-8 text-xs text-gray-400 text-center max-w-xs">
          登录即代表你同意我们的
          <a href="#" className="text-pink-400 hover:underline">用户协议</a>
          和
          <a href="#" className="text-pink-400 hover:underline">隐私政策</a>
        </p>
      </div>
    </div>
  )
}
