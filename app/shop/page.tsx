'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ShopPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'checkin' | 'gift'>('checkin')
  const [coins] = useState(236)
  const [streak] = useState(7)

  // 签到日历数据（当前月份）
  const currentMonth = '2026 年 3 月'
  const daysInMonth = 31
  const checkinDays = [1, 2, 3, 4, 5, 6, 7, 12, 15, 18, 20, 22, 25] // 已签到日期

  const today = 26
  const hasCheckedInToday = false

  const gifts = [
    { id: 1, name: '樱花头饰', price: 50, icon: '🌸', category: '装扮', owned: false },
    { id: 2, name: '爱心便当', price: 30, icon: '🍱', category: '食物', owned: false },
    { id: 3, name: '毛绒玩具', price: 80, icon: '🧸', category: '礼物', owned: true },
    { id: 4, name: '星空项链', price: 120, icon: '✨', category: '装扮', owned: false },
    { id: 5, name: '手写信件', price: 20, icon: '💌', category: '礼物', owned: false },
    { id: 6, name: '甜品套餐', price: 45, icon: '🍰', category: '食物', owned: false },
    { id: 7, name: '鲜花花束', price: 60, icon: '💐', category: '礼物', owned: false },
    { id: 8, name: '定制服装', price: 150, icon: '👗', category: '装扮', owned: false },
  ]

  const checkinRewards = [
    { day: 1, coins: 10, bonus: '' },
    { day: 2, coins: 10, bonus: '' },
    { day: 3, coins: 10, bonus: '🎁' },
    { day: 4, coins: 10, bonus: '' },
    { day: 5, coins: 10, bonus: '' },
    { day: 6, coins: 10, bonus: '' },
    { day: 7, coins: 20, bonus: '🎉' },
  ]

  const handleCheckIn = () => {
    // 签到逻辑
    console.log('Check in!')
  }

  const handleBuyGift = (gift: typeof gifts[0]) => {
    if (coins >= gift.price) {
      console.log(`Buying ${gift.name}`)
    }
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
        <h1 className="flex-1 text-lg font-bold text-gray-800">签到 & 礼物</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
          <span className="text-sm">🪙</span>
          <span className="text-sm font-bold text-yellow-600">{coins}</span>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="px-4 py-4">
        <div className="flex bg-white rounded-2xl p-1 shadow-soft">
          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'checkin'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            📅 每日签到
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'gift'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            🎁 礼物商城
          </button>
        </div>
      </div>

      {activeTab === 'checkin' ? (
        /* 签到页面 */
        <div className="px-4 space-y-6">
          {/* 今日签到卡片 */}
          <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl p-6 text-white shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{currentMonth}</h2>
                <p className="text-sm text-white/80">连续签到 {streak} 天</p>
              </div>
              <div className="text-5xl">🎁</div>
            </div>

            {!hasCheckedInToday ? (
              <button
                onClick={handleCheckIn}
                className="w-full py-4 bg-white text-pink-400 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                今日签到 +10🪙
              </button>
            ) : (
              <div className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-2xl text-center font-medium">
                ✓ 今日已签到
              </div>
            )}
          </div>

          {/* 签到日历 */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <h3 className="text-lg font-bold text-gray-800 mb-4">签到日历</h3>
            <div className="grid grid-cols-7 gap-2">
              {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const isToday = day === today
                const hasCheckedIn = checkinDays.includes(day)
                const isFuture = day > today

                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                      isToday
                        ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-md scale-110'
                        : hasCheckedIn
                        ? 'bg-green-100 text-green-600'
                        : isFuture
                        ? 'bg-gray-50 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {hasCheckedIn && !isToday ? '✓' : day}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 签到奖励 */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <h3 className="text-lg font-bold text-gray-800 mb-4">本周奖励</h3>
            <div className="grid grid-cols-7 gap-2">
              {checkinRewards.map((reward) => (
                <div
                  key={reward.day}
                  className={`text-center p-3 rounded-2xl ${
                    checkinDays.includes(reward.day)
                      ? 'bg-gradient-to-br from-pink-100 to-purple-100'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">第{reward.day}天</div>
                  <div className="text-lg font-bold text-pink-400">+{reward.coins}🪙</div>
                  {reward.bonus && <div className="text-lg mt-1">{reward.bonus}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 签到说明 */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">💡 签到小贴士</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>• 每日签到可获得 10 爱心币</li>
              <li>• 连续签到 7 天可获得额外奖励</li>
              <li>• 爱心币可用于购买礼物和装扮</li>
              <li>• 断签会重置连续签到天数哦</li>
            </ul>
          </div>
        </div>
      ) : (
        /* 礼物商城页面 */
        <div className="px-4 space-y-6">
          {/* 分类筛选 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['全部', '装扮', '食物', '礼物'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-soft whitespace-nowrap hover:bg-pink-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* 礼物列表 */}
          <div className="grid grid-cols-2 gap-4">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-3xl p-4 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl mb-3">
                  {gift.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{gift.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-400">{gift.price}🪙</span>
                  {gift.owned ? (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-medium">
                      已拥有
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuyGift(gift)}
                      disabled={coins < gift.price}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        coins >= gift.price
                          ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      购买
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 礼物说明 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">🎁 礼物说明</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>• 购买后的礼物会存入礼物背包</li>
              <li>• 送给角色可以增加好感度</li>
              <li>• 不同角色喜欢的礼物类型不同</li>
              <li>• 特殊节日会有专属限定礼物</li>
            </ul>
          </div>
        </div>
      )}

      {/* 底部导航占位 */}
      <div className="h-20" />
    </div>
  )
}
