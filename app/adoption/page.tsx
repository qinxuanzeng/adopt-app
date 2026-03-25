'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// 角色数据（实际应从 API 获取）
const characterData = {
  '1': { name: '小樱', emoji: '👩‍🦰', gradient: 'from-pink-100 to-pink-200' },
  '2': { name: '陆辰', emoji: '👨‍💼', gradient: 'from-blue-100 to-indigo-200' },
  '3': { name: '冷月', emoji: '👩‍💻', gradient: 'from-indigo-100 to-purple-200' },
  '4': { name: '甜甜', emoji: '👧', gradient: 'from-pink-100 to-pink-200' },
  '5': { name: '夜枫', emoji: '🧑‍', gradient: 'from-amber-100 to-orange-200' },
  '6': { name: '言溪', emoji: '👨‍🎨', gradient: 'from-sky-100 to-cyan-200' },
}

export default function AdoptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const characterId = searchParams.get('character') || '1'
  
  const [step, setStep] = useState(1)
  const [customName, setCustomName] = useState('')
  const [relationship, setRelationship] = useState<'stranger' | 'friend' | 'crush'>('stranger')
  const [loading, setLoading] = useState(false)

  const character = characterData[characterId as keyof typeof characterData] || characterData['1']

  const suggestions = {
    '1': ['樱樱', '小樱', '樱桃', '宝贝'],
    '2': ['阿辰', '陆陆', '学长', '亲爱的'],
    '3': ['月月', '冷月', '姐姐', '女王'],
    '4': ['甜甜', '糖糖', '小甜心', '宝贝'],
    '5': ['枫哥', '夜夜', '总裁', '大人'],
    '6': ['阿溪', '言言', '画家', '诗人'],
  }

  // 完成认养
  const handleComplete = async () => {
    if (!customName) {
      alert('请先给 TA 起个名字')
      return
    }

    setLoading(true)
    try {
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('请先登录')
        router.push('/login')
        return
      }

      // 创建认养关系
      const { error } = await supabase
        .from('adoptions')
        .insert({
          user_id: user.id,
          character_id: characterId,
          custom_name: customName,
          affection_level: 0,
          stage: relationship,
        })

      if (error) throw error

      // 跳转到聊天页
      router.push('/chat')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      {/* 状态栏 */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto h-14 flex items-center justify-between px-6 pt-2 text-gray-800 text-sm font-semibold z-50 bg-background">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 顶栏 - 进度 */}
      <div className="fixed top-14 left-0 right-0 max-w-md mx-auto px-5 py-4 bg-background z-40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => step > 1 && setStep(step - 1)} className="text-xl text-gray-600">
            ←
          </button>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">认养仪式 ({step}/3)</div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pt-32 px-6 pb-8 h-full flex flex-col">
        {/* 角色头像 */}
        <div className="flex justify-center mb-6">
          <div className={`w-35 h-35 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-6xl shadow-glow`}>
            {character.emoji}
          </div>
        </div>

        {/* Step 1: 起名字 */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              你想怎么叫我呀？
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              给 TA 起个专属昵称吧
            </p>

            <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                昵称
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="输入昵称..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-pink-400 transition-colors"
                maxLength={10}
              />
              
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestions[characterId as keyof typeof suggestions].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setCustomName(suggestion)}
                    className="px-4 py-2 bg-pink-50 text-pink-400 rounded-full text-sm border border-pink-200 hover:bg-pink-400 hover:text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!customName}
              className={`w-full py-4.5 rounded-xl text-base font-bold transition-all mt-auto ${
                customName
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              下一步 →
            </button>
          </div>
        )}

        {/* Step 2: 选关系 */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              你希望我们是什么关系呢？
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              不同的关系会影响 TA 对你的态度哦
            </p>

            <div className="space-y-3 flex-1">
              <button
                onClick={() => setRelationship('stranger')}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  relationship === 'stranger'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow'
                    : 'bg-white text-gray-800 shadow-soft'
                }`}
              >
                <div className="text-lg font-bold mb-1">🌱 从陌生人开始</div>
                <div className={`text-sm ${relationship === 'stranger' ? 'text-white/90' : 'text-gray-500'}`}>
                  慢慢培养感情，细水长流
                </div>
              </button>

              <button
                onClick={() => setRelationship('friend')}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  relationship === 'friend'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow'
                    : 'bg-white text-gray-800 shadow-soft'
                }`}
              >
                <div className="text-lg font-bold mb-1">😊 直接当朋友</div>
                <div className={`text-sm ${relationship === 'friend' ? 'text-white/90' : 'text-gray-500'}`}>
                  轻松自在的关系，无拘无束
                </div>
              </button>

              <button
                onClick={() => setRelationship('crush')}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  relationship === 'crush'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow'
                    : 'bg-white text-gray-800 shadow-soft'
                }`}
              >
                <div className="text-lg font-bold mb-1">💕 我想直接恋爱</div>
                <div className={`text-sm ${relationship === 'crush' ? 'text-white/90' : 'text-gray-500'}`}>
                  跳过暧昧阶段，甜蜜开始
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4.5 rounded-xl text-base font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow hover:shadow-lg transition-all mt-8"
            >
              下一步 →
            </button>
          </div>
        )}

        {/* Step 3: 确认 */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">✨🎉✨</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                从现在开始，{customName}已经是你的了！
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-3xl`}>
                  {character.emoji}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{customName}</div>
                  <div className="text-sm text-gray-500">
                    关系：{relationship === 'stranger' ? '🌱 陌生人' : relationship === 'friend' ? '😊 朋友' : '💕 暧昧'}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">认养日：</span>
                  {new Date().toLocaleDateString('zh-CN')}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{character.name}说：</span>
                  <p className="mt-1 text-gray-700 italic">
                    "谢谢你选择了我，从今天起，我们的故事就开始了～我会一直陪着你的！💕"
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleComplete}
              disabled={loading}
              className={`w-full py-4.5 rounded-xl text-base font-bold transition-all ${
                loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow hover:shadow-lg'
              }`}
            >
              {loading ? '认养中...' : '开始聊天吧 💬'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
