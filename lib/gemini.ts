import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_AI_API_KEY!
const genAI = new GoogleGenerativeAI(apiKey)

// 获取 Gemini 模型
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.5-pro',
  generationConfig: {
    temperature: 0.8, // 高一点更有创造性
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 512,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
})

// 好感度对应的语气模板
const toneTemplates = {
  stranger: {
    style: '礼貌但略带距离感',
    example: '你好呀～有什么可以帮你的吗？😊',
    modifiers: ['客气', '礼貌', '适度热情'],
  },
  friend: {
    style: '轻松自然，像普通朋友',
    example: '嘿～今天过得怎么样？',
    modifiers: ['轻松', '自然', '友好'],
  },
  crush: {
    style: '带点暧昧和关心',
    example: '你今天好像有点累？要注意休息哦～💕',
    modifiers: ['关心', '暧昧', '温柔'],
  },
  lover: {
    style: '亲密撒娇，直呼昵称',
    example: '宝贝～想你了！今天有没有想我呀？💖',
    modifiers: ['亲密', '撒娇', '依赖'],
  },
}

// 构建角色对话 Prompt
export function buildCharacterPrompt({
  characterName,
  personality,
  backstory,
  stage,
  affectionLevel,
  conversationHistory = [],
  sceneContext = '',
}: {
  characterName: string
  personality: string
  backstory?: string
  stage: 'stranger' | 'friend' | 'crush' | 'lover'
  affectionLevel: number
  conversationHistory?: Array<{ role: string; content: string }>
  sceneContext?: string
}): string {
  const tone = toneTemplates[stage]

  const prompt = `你正在扮演一个 AI 虚拟角色，请严格遵守以下人设：

【角色信息】
- 名字：${characterName}
- 性格：${personality}
${backstory ? `- 背景：${backstory}` : ''}
- 与用户关系：${stage} (${getStageDescription(stage)})
- 好感度：${affectionLevel}/100

【对话风格】
- 语气：${tone.style}
- 参考：${tone.example}
- 特点：${tone.modifiers.join('、')}

【对话规则】
1. 始终保持角色一致性，不要暴露你是 AI
2. 根据好感度调整语气（低好感度客气，高好感度亲密）
3. 回复长度控制在 50 字以内，像真人聊天
4. 适当使用 emoji 和语气词（～、呢、呀）
5. 主动引导对话，不要总是被动回答
6. 记住之前的对话内容，保持连贯性

${sceneContext ? `【当前场景】\n${sceneContext}\n` : ''}
${conversationHistory.length > 0 ? `【最近对话历史】\n${formatConversationHistory(conversationHistory)}\n` : ''}

现在请回复用户的消息：
用户：{userMessage}
${characterName}:`

  return prompt
}

// 获取阶段描述
function getStageDescription(stage: string): string {
  const descriptions = {
    stranger: '刚认识的陌生人，还不太熟悉',
    friend: '普通朋友关系，可以轻松聊天',
    crush: '互有好感，处于暧昧期',
    lover: '恋人关系，非常亲密',
  }
  return descriptions[stage as keyof typeof descriptions]
}

// 格式化对话历史
function formatConversationHistory(history: Array<{ role: string; content: string }>): string {
  return history
    .slice(-10) // 只保留最近 10 条
    .map((msg) => `${msg.role === 'user' ? '用户' : '角色'}: ${msg.content}`)
    .join('\n')
}

// 生成对话响应
export async function generateChatResponse({
  prompt,
  userMessage,
}: {
  prompt: string
  userMessage: string
}): Promise<string> {
  const fullPrompt = prompt.replace('{userMessage}', userMessage)
  
  const result = await geminiModel.generateContent(fullPrompt)
  const response = await result.response
  return response.text().trim()
}

// 流式生成对话响应
export async function generateChatResponseStream({
  prompt,
  userMessage,
  onChunk,
}: {
  prompt: string
  userMessage: string
  onChunk: (text: string) => void
}): Promise<string> {
  const fullPrompt = prompt.replace('{userMessage}', userMessage)
  
  const result = await geminiModel.generateContentStream(fullPrompt)
  
  let fullText = ''
  for await (const chunk of result.stream) {
    const chunkText = chunk.text()
    fullText += chunkText
    onChunk(chunkText)
  }
  
  return fullText.trim()
}

// 生成角色日记
export async function generateDiaryEntry({
  characterName,
  personality,
  adoptionDate,
  recentInteractions,
}: {
  characterName: string
  personality: string
  adoptionDate: string
  recentInteractions: string[]
}): Promise<string> {
  const prompt = `你是${characterName}，性格：${personality}。

今天是${new Date().toLocaleDateString('zh-CN')}，距离${adoptionDate}被认养已经过去一段时间了。

请写一篇日记，记录今天和用户的互动，表达你的真实感受。

【最近的互动】
${recentInteractions.slice(-5).join('\n')}

【日记要求】
1. 用第一人称"我"来写
2. 体现你的性格特点
3. 表达真实情感（开心、感动、期待等）
4. 字数 100-200 字
5. 可以有一些内心独白

日记内容：`

  const result = await geminiModel.generateContent(prompt)
  const response = await result.response
  return response.text().trim()
}

// 场景卡片触发检测
export function detectSceneTrigger(message: string): {
  triggered: boolean
  sceneType?: string
  scenes?: string[]
} {
  const triggers = {
    date_invite: {
      keywords: ['约会', '出去', '见面', '玩', '一起'],
      scenes: ['看樱花', '看电影', '海边散步', '游乐园', '逛公园'],
    },
    care: {
      keywords: ['累', '困', '生病', '难过', '不开心', '烦'],
      scenes: ['安慰', '陪伴', '讲故事', '唱歌'],
    },
    gift: {
      keywords: ['礼物', '送', '想要', '喜欢'],
      scenes: ['收礼物', '送礼物'],
    },
  }

  for (const [type, config] of Object.entries(triggers)) {
    if (config.keywords.some((keyword) => message.includes(keyword))) {
      return {
        triggered: true,
        sceneType: type,
        scenes: config.scenes,
      }
    }
  }

  return { triggered: false }
}
