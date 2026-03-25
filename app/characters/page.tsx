'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 角色数据类型
interface Character {
  id: string
  name: string
  gender: 'male' | 'female'
  personality: string
  avatar_emoji: string
  tier: 'free' | 'premium'
  popularity: number
  gradient: string
}

// 初始角色数据
const characters: Character[] = [
  {
    id: '1',
    name: '小樱',
    gender: 'female',
    personality: '温柔学姐 · 爱做饭',
    avatar_emoji: '👩‍🦰',
    tier: 'free',
    popularity: 23000,
    gradient: 'from-pink-100 to-pink-200',
  },
  {
    id: '2',
    name: '陆辰',
    gender: 'male',
    personality: '暖男学长 · 运动达人',
    avatar_emoji: '👨‍💼',
    tier: 'free',
    popularity: 18000,
    gradient: 'from-blue-100 to-indigo-200',
  },
  {
    id: '3',
    name: '冷月',
    gender: 'female',
    personality: '高冷御姐 · 独立飒爽',
    avatar_emoji: '👩‍💻',
    tier: 'premium',
    popularity: 31000,
    gradient: 'from-indigo-100 to-purple-200',
  },
  {
    id: '4',
    name: '甜甜',
    gender: 'female',
    personality: '元气少女 · 爱追剧',
    avatar_emoji: '👧',
    tier: 'free',
    popularity: 42000,
    gradient: 'from-pink-100 to-pink-200',
  },
  {
    id: '5',
    name: '夜枫',
    gender: 'male',
    personality: '冷酷总裁 · 霸道温柔',
    avatar_emoji: '🧑‍',
    tier: 'premium',
    popularity: 56000,
    gradient: 'from-amber-100 to-orange-200',
  },
  {
    id: '6',
    name: '言溪',
    gender: 'male',
    personality: '文艺画家 · 浪漫诗人',
    avatar_emoji: '👨‍🎨',
    tier: 'free',
    popularity: 12000,
    gradient: 'from-sky-100 to-cyan-200',
  },
]

export default function CharactersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'all' | 'female' | 'male' | 'hot'>('all')

  // 筛选角色
  const filteredCharacters = characters.filter((char) => {
    if (activeTab === 'all') return true
    if (activeTab === 'female') return char.gender === 'female'
    if (activeTab === 'male') return char.gender === 'male'
    if (activeTab === 'hot') return char.popularity >= 30000
    return true
  })

  const handleCharacterClick = (character: Character) => {
    // TODO: 显示角色详情弹窗
    console.log('Selected character:', character)
  }

  const handleAdopt = (character: Character) => {
    // TODO: 跳转到认养仪式页
    router.push(`/adoption?character=${character.id}`)
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* 状态栏 */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto h-14 flex items-center justify-between px-6 pt-2 text-gray-800 text-sm font-semibold z-50 bg-background">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 顶栏 */}
      <div className="fixed top-14 left-0 right-0 max-w-md mx-auto px-5 pb-3 bg-background z-40">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">遇见 TA ✨</h1>
        
        {/* 搜索框 */}
        <div className="flex items-center bg-white rounded-xl px-4 py-3 mb-3 shadow-soft">
          <span className="text-lg text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="搜索角色..."
            className="flex-1 text-sm text-gray-400 bg-transparent outline-none"
            disabled
          />
        </div>

        {/* Tab 筛选 */}
        <div className="flex gap-2">
          {(['all', 'female', 'male', 'hot'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow'
                  : 'bg-white text-gray-500'
              }`}
            >
              {tab === 'all' && '全部'}
              {tab === 'female' && '女友'}
              {tab === 'male' && '男友'}
              {tab === 'hot' && '🔥 热门'}
            </button>
          ))}
        </div>
      </div>

      {/* 角色列表 */}
      <div className="pt-60 px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => handleCharacterClick(char)}
              className="bg-white rounded-2xl overflow-hidden shadow-soft active:scale-97 transition-transform cursor-pointer"
            >
              {/* 头像区 */}
              <div className={`h-45 flex items-center justify-center text-6xl bg-gradient-to-br ${char.gradient} relative`}>
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/85 text-green-500">
                  {char.tier === 'free' ? 'FREE' : '👑 PRO'}
                </span>
                {char.avatar_emoji}
              </div>

              {/* 信息区 */}
              <div className="p-3.5">
                <div className="text-base font-semibold text-gray-800 mb-1">{char.name}</div>
                <div className="text-xs text-gray-400 mb-2">{char.personality}</div>
                <div className="text-xs text-pink-400 flex items-center gap-1">
                  <span>♡</span>
                  <span>{(char.popularity / 1000).toFixed(1)}万认养</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 Tab 栏 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-21 bg-white flex items-start justify-around pt-2.5 shadow-soft z-50 rounded-t-2xl">
        <div className="flex flex-col items-center gap-1 text-pink-400">
          <span className="text-6">🏠</span>
          <span className="text-2.5">首页</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-6">💬</span>
          <span className="text-2.5">聊天</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-6">📊</span>
          <span className="text-2.5">成长</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-6">👤</span>
          <span className="text-2.5">我的</span>
        </div>
      </div>
    </div>
  )
}
