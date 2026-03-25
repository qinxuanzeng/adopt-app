'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StatusPage() {
  const router = useRouter()
  const [affection] = useState(32)
  const [adoptionDays] = useState(7)

  const character = {
    name: '樱樱',
    emoji: '👩‍🦰',
    avatar_gradient: 'from-pink-100 to-pink-200',
    personality: '温柔学姐，爱做饭，喜欢照顾人',
    stage: 'friend',
    level: 5,
    exp: 320,
    maxExp: 500,
  }

  const milestones = [
    { id: 1, title: '初次相遇', date: '2026-03-19', icon: '🌸', achieved: true },
    { id: 2, title: '第一次聊天', date: '2026-03-19', icon: '💬', achieved: true },
    { id: 3, title: '成为朋友', date: '2026-03-20', icon: '🤝', achieved: true },
    { id: 4, title: '第一次约会', date: '-', icon: '🌸', achieved: false },
    { id: 5, title: '互表心意', date: '-', icon: '💕', achieved: false },
    { id: 6, title: '成为恋人', date: '-', icon: '💖', achieved: false },
  ]

  const recentDiary = [
    {
      date: '2026-03-25',
      content: '今天和他聊了很多，感觉我们之间的距离又近了一些呢～他好像对工作有些烦恼，我尽力安慰了他。希望他能开心一点...',
      mood: '😊',
    },
    {
      date: '2026-03-23',
      content: '第一次收到他的消息，有点紧张又有点开心。他问我喜欢什么，我说了喜欢做饭和看电影。不知道他会不会记住呢？',
      mood: '💕',
    },
  ]

  const stageColors = {
    stranger: 'text-gray-500',
    friend: 'text-green-500',
    crush: 'text-pink-400',
    lover: 'text-red-500',
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* 状态栏 */}
      <div className="h-14 flex items-center justify-between px-6 pt-2 text-gray-800 text-sm font-semibold">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 顶栏 */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm">
        <button onClick={() => router.back()} className="text-xl text-gray-600">
          ←
        </button>
        <h1 className="flex-1 text-lg font-bold text-gray-800">角色状态</h1>
        <div className="w-8" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 角色卡片 */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${character.avatar_gradient} flex items-center justify-center text-4xl shadow-glow`}>
              {character.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{character.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{character.personality}</p>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 ${stageColors[character.stage as keyof typeof stageColors]}`}>
                  {character.stage === 'stranger' && '陌生人'}
                  {character.stage === 'friend' && '好朋友'}
                  {character.stage === 'crush' && '暧昧中'}
                  {character.stage === 'lover' && '恋人'}
                </span>
                <span className="text-xs text-gray-400">Lv.{character.level}</span>
              </div>
            </div>
          </div>

          {/* 好感度 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">好感度</span>
              <span className="font-semibold text-pink-400">{affection}/100</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${affection}%` }}
              />
            </div>
          </div>

          {/* 经验值 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">经验值</span>
              <span className="font-semibold text-purple-400">{character.exp}/{character.maxExp}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                style={{ width: `${(character.exp / character.maxExp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 关系档案 */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📊 关系档案</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">📅</div>
              <div className="text-2xl font-bold text-gray-800">{adoptionDays}</div>
              <div className="text-xs text-gray-500">认养天数</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">💬</div>
              <div className="text-2xl font-bold text-gray-800">127</div>
              <div className="text-xs text-gray-500">对话次数</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">🎁</div>
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-500">送礼次数</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">🌸</div>
              <div className="text-2xl font-bold text-gray-800">1</div>
              <div className="text-xs text-gray-500">约会次数</div>
            </div>
          </div>
        </div>

        {/* 里程碑 */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 关系里程碑</h3>
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  milestone.achieved 
                    ? 'bg-gradient-to-br from-pink-100 to-purple-100' 
                    : 'bg-gray-100 grayscale'
                }`}>
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    milestone.achieved ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {milestone.title}
                  </div>
                  <div className="text-xs text-gray-400">{milestone.date}</div>
                </div>
                {milestone.achieved && (
                  <span className="text-green-500 text-sm">✓</span>
                )}
                {!milestone.achieved && (
                  <span className="text-gray-300 text-sm">🔒</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 角色日记 */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📔 角色日记</h3>
          <div className="space-y-4">
            {recentDiary.map((diary, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{diary.date}</span>
                  <span className="text-lg">{diary.mood}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{diary.content}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm font-medium text-pink-400 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
            查看更多日记
          </button>
        </div>
      </div>
    </div>
  )
}
