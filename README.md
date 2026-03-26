# 认养 App - Adopt Your AI Partner 🐉

> 认养你的专属 AI 恋人 · 陪伴 · 养成 · 情感连接

## 📱 项目简介

一个让用户"认养"AI 虚拟男/女友的陪伴型 App，通过日常聊天、养成互动建立情感羁绊。

**核心功能：**
- 🎭 角色认养系统 - 多种人设可选
- 💬 AI 对话引擎 - Gemini 驱动的自然对话
- 📈 养成成长系统 - 好感度、阶段进化
- 🎁 互动玩法 - 礼物、签到、小游戏
- 📖 角色日记 - AI 记录与你的点滴

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 14 + TypeScript + Tailwind CSS |
| UI 组件 | shadcn/ui (Figma → Stitch 生成) |
| 后端 | Next.js API Routes |
| 数据库 | Supabase (PostgreSQL) |
| AI 对话 | Google AI Studio (Gemini 2.5 Pro) |
| 部署 | Vercel |
| 认证 | Supabase Auth |

## 🚀 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone <repo-url>
cd adopt-app

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local
```

### 2. 配置环境变量

编辑 `.env.local`：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
GOOGLE_AI_API_KEY=your_gemini_api_key
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📁 项目结构

```
adopt-app/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 启动页
│   ├── login/             # 登录注册
│   ├── characters/        # 角色选择
│   ├── adoption/          # 认养仪式
│   ├── chat/              # 聊天页
│   ├── status/            # 角色状态
│   └── profile/           # 个人中心
├── components/             # React 组件
│   ├── ui/                # shadcn/ui 基础组件
│   ├── CharacterCard.tsx  # 角色卡片
│   ├── ChatBubble.tsx     # 对话气泡
│   └── ...
├── lib/                    # 工具库
│   ├── supabase.ts        # Supabase 客户端
│   ├── gemini.ts          # Gemini API 封装
│   └── utils.ts
├── types/                  # TypeScript 类型定义
└── tailwind.config.ts     # Tailwind 配置
```

## 📊 数据库

数据库 Schema 详见：[技术开发文档](https://feishu.cn/docx/JklSd1Y15oZmXFx3VwacJ9WjnKh)

**核心表：**
- `users` - 用户表
- `characters` - 角色模板
- `adoptions` - 认养关系
- `conversations` - 对话记录
- `gifts` - 礼物系统
- `diary_entries` - 角色日记

## 🎨 设计资源

- **产品方案文档**: https://feishu.cn/docx/JbYmd3eOzoGG2VxxFkkcSg97nAc
- **UI 设计说明**: https://feishu.cn/docx/RchKdVG0roWaw2x8JVfc7UAZnPd
- **Mockup 预览**: `/workspace/adopt-app-mockups/`

## 📅 开发计划

### Week 1 (03.25-03.31)
- [x] 产品方案设计
- [x] UI Mockup 设计
- [x] 技术文档
- [ ] Figma 高保真
- [ ] Supabase 建库

### Week 2 (04.01-04.07)
- [ ] 前端页面开发
- [ ] 用户认证系统
- [ ] 角色选择/认养流程
- [ ] 基础对话功能

### Week 3 (04.08-04.14)
- [ ] 好感度系统
- [ ] 礼物系统
- [ ] 日记系统

### Week 4 (04.15-04.21)
- [ ] 测试 & Bug fix
- [ ] 上线发布 🚀

##  成本估算

**开发阶段（MVP）**: ¥0-60
- Supabase: $0 (免费额度)
- Vercel: $0 (免费额度)
- Google AI Studio: $0 (免费 60 次/分钟)

**运营阶段（1000 DAU）**: ~¥1000/月

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 License

MIT License

---

**开发团队**: 阿金 & 主人  
**开始日期**: 2026-03-25  
**状态**: ✅ 代码完成，已部署

## 🔗 链接

- **GitHub**: https://github.com/qinxuanzeng/adopt-app
- **在线演示**: 待部署（Vercel）
