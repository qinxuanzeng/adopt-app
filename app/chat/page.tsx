'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { generateChatResponse, buildCharacterPrompt, detectSceneTrigger } from '@/lib/gemini'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sceneCard?: SceneCard
}

interface SceneCard {
  type: 'date' | 'care' | 'gift'
  title: string
  description: string
  emoji: string
  actions: Array<{ label: string; emoji: string }>
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟角色数据（实际应从 API 获取）
  const character = {
    id: '1',
    name: '樱樱',
    emoji: '👩‍🦰',
    personality: '温柔学姐，爱做饭，喜欢照顾人',
    avatar_gradient: 'from-pink-100 to-pink-200',
  }

  const [affection, setAffection] = useState(32)

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 初始化欢迎消息
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '你好呀～今天过得怎么样呢？☺️',
        timestamp: new Date(),
      },
    ])
  }, [])

  // 发送消息
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setTyping(true)

    try {
      // 检测场景触发
      const trigger = detectSceneTrigger(userMessage.content)
      
      // 构建 Prompt
      const prompt = buildCharacterPrompt({
        characterName: character.name,
        personality: character.personality,
        stage: 'friend',
        affectionLevel: affection,
        conversationHistory: messages.slice(-5).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      })

      // 调用 Gemini API
      const response = await generateChatResponse({
        prompt,
        userMessage: userMessage.content,
      })

      // 检查是否需要显示场景卡片
      let sceneCard: SceneCard | undefined
      if (trigger.triggered && trigger.scenes) {
        sceneCard = {
          type: trigger.sceneType as any,
          title: trigger.sceneType === 'date_invite' ? '🌸 今日约会' : '💝 特别时刻',
          description: `我们一起去${trigger.scenes[0]}吧～`,
          emoji: trigger.sceneType === 'date_invite' ? '🌸' : '💝',
          actions: [
            { label: '好呀', emoji: '💕' },
            { label: '下次吧', emoji: '😳' },
          ],
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sceneCard,
      }

      setMessages((prev) => [...prev, aiMessage])
      
      // 增加好感度
      setAffection((prev) => Math.min(prev + 1, 100))
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我刚才走神了...你能再说一遍吗？😅',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setTyping(false)
    }
  }

  // 处理场景卡片点击
  const handleSceneAction = (action: string) => {
    setInput(action)
  }

  return (
    <div className="w-full h-screen bg-background flex flex-col">
      {/* 状态栏 */}
      <div className="h-14 flex items-center justify-between px-6 pt-2 text-gray-800 text-sm font-semibold bg-white">
        <span>19:36</span>
        <div className="flex gap-1.5 text-xs">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 聊天顶栏 */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => router.back()} className="text-xl text-gray-600">
          ←
        </button>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${character.avatar_gradient} flex items-center justify-center text-xl`}>
          {character.emoji}
        </div>
        <div className="flex-1">
          <div className="text-base font-semibold text-gray-800">{character.name}</div>
          <div className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            在线
          </div>
        </div>
        <div className="px-3 py-1.5 bg-pink-50 text-pink-400 rounded-full text-sm font-medium">
          ♡ {affection}
        </div>
        <button className="text-xl text-gray-400">⋮</button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {/* 时间分隔符 */}
            {message.id === messages[0]?.id && (
              <div className="text-center text-xs text-gray-400 my-4">
                今天 {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}

            {/* 消息气泡 */}
            <div className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* 头像 */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-100 to-indigo-200' 
                  : `bg-gradient-to-br ${character.avatar_gradient}`
              }`}>
                {message.role === 'user' ? '🧑' : character.emoji}
              </div>

              {/* 气泡 */}
              <div className={`max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-br-md'
                    : 'bg-white text-gray-800 shadow-soft rounded-bl-md'
                }`}>
                  {message.content}
                </div>

                {/* 场景卡片 */}
                {message.sceneCard && (
                  <div className="mt-2 bg-white rounded-2xl overflow-hidden shadow-soft max-w-[260px]">
                    <div className="h-35 bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 flex items-center justify-center text-5xl relative">
                      <div className="absolute top-2 left-2 px-2.5 py-1 bg-white/85 rounded-lg text-xs font-bold text-pink-400">
                        {message.sceneCard.title}
                      </div>
                      {message.sceneCard.emoji}
                    </div>
                    <div className="p-3.5">
                      <div className="text-sm text-gray-700 mb-3">
                        {message.sceneCard.description}
                      </div>
                      <div className="flex gap-2">
                        {message.sceneCard.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleSceneAction(action.label)}
                            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                              index === 0
                                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {action.label} {action.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 正在输入 */}
        {typing && (
          <div className="flex gap-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${character.avatar_gradient} flex items-center justify-center text-sm`}>
              {character.emoji}
            </div>
            <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-md shadow-soft">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区 */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 pb-8">
        {/* 工具栏 */}
        <div className="flex gap-1 mb-2">
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            😀
          </button>
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            🎁
          </button>
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            📸
          </button>
          <button className="w-10 h-10 rounded-xl bg-gray-50 text-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            🎮
          </button>
        </div>

        {/* 输入框 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-3 bg-gray-50 rounded-full border-0 outline-none text-sm focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all ${
              input.trim() && !loading
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-glow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}
