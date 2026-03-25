'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [user] = useState({
    nickname: '主人',
    avatar: '🧑',
    userId: 'u_123456',
    memberSince: '2026-03-19',
    totalSpent: 168,
    favoriteCharacter: '樱樱',
  })

  const settings = [
    { icon: '🔔', label: '消息通知', value: '开启', type: 'toggle' },
    { icon: '🌙', label: '夜间模式', value: '关闭', type: 'toggle' },
    { icon: '🔊', label: '语音播报', value: '开启', type: 'toggle' },
    { icon: '🌐', label: '语言', value: '简体中文', type: 'link' },
    { icon: '🔒', label: '隐私设置', value: '', type: 'link' },
  ]

  const menuItems = [
    { icon: '💳', label: '我的钱包', badge: '¥236' },
    { icon: '🎫', label: '优惠券', badge: '3 张' },
    { icon: '🎁', label: '礼物背包', badge: '5 个' },
    { icon: '📸', label: '相册回忆', badge: '' },
    { icon: '⭐', label: '收藏夹', badge: '' },
    { icon: '❓', label: '帮助与反馈', badge: '' },
    { icon: '📜', label: '用户协议', badge: '' },
    { icon: '🔐', label: '隐私政策', badge: '' },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-50">
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
        <h1 className="flex-1 text-lg font-bold text-gray-800">个人中心</h1>
        <div className="w-8" />
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-br from-pink-400 to-purple-400 px-4 pb-8 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
            {user.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{user.nickname}</h2>
            <p className="text-sm text-white/80 mb-2">ID: {user.userId}</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">
                会员 {user.memberSince}
              </span>
              <span className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">
                累计 ¥{user.totalSpent}
              </span>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium text-white hover:bg-white/30 transition-colors">
            编辑
          </button>
        </div>

        {/* 快捷数据 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-white/80 mt-1">已认养角色</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-xs text-white/80 mt-1">总对话数</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-xs text-white/80 mt-1">活跃天数</div>
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-medium text-gray-700">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-1 bg-pink-100 text-pink-400 rounded-lg text-xs font-medium">
                  {item.badge}
                </span>
              )}
              <span className="text-gray-300 text-sm">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* 设置选项 */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-500">设置</h3>
          </div>
          {settings.map((setting, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <span className="text-xl">{setting.icon}</span>
              <span className="flex-1 text-left text-sm font-medium text-gray-700">{setting.label}</span>
              {setting.type === 'toggle' ? (
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  setting.value === '开启' ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${
                    setting.value === '开启' ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </div>
              ) : (
                <>
                  {setting.value && (
                    <span className="text-sm text-gray-400 mr-2">{setting.value}</span>
                  )}
                  <span className="text-gray-300 text-sm">›</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 退出登录 */}
      <div className="px-4 mt-6 mb-8">
        <button className="w-full py-4 bg-white rounded-3xl shadow-soft text-sm font-medium text-red-400 hover:bg-red-50 transition-colors">
          退出登录
        </button>
      </div>

      {/* 版本信息 */}
      <div className="text-center text-xs text-gray-400 pb-8">
        <p>Version 1.0.0</p>
        <p className="mt-1">Made with 💖 by 神兽工作室</p>
      </div>
    </div>
  )
}
