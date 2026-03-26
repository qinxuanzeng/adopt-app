# 🚀 部署指南

**构建状态**: ✅ 成功  
**最后更新**: 2026-03-26 07:55

---

## 📦 本地测试

```bash
cd /home/admin/.openclaw/workspace/adopt-app

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 本地预览生产版本
npm start
```

---

## 🔗 推送到 GitHub

### 1. 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库，例如：
- 仓库名：`adopt-app`
- 可见性：Public 或 Private（推荐 Private）
- **不要** 初始化 README、.gitignore 或 license（已有）

### 2. 关联远程仓库

```bash
cd /home/admin/.openclaw/workspace/adopt-app

# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/adopt-app.git

# 推送代码
git push -u origin master
```

---

## ⚡ 部署到 Vercel

### 方式 A: Vercel Dashboard（推荐）

1. 访问 https://vercel.com/new
2. 点击 **"Import Git Repository"**
3. 选择 `adopt-app` 仓库
4. 配置环境变量（见下方）
5. 点击 **"Deploy"**

### 方式 B: Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
cd /home/admin/.openclaw/workspace/adopt-app
vercel

# 生产环境部署
vercel --prod
```

---

## 🔐 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key | `eyJhbG...` |
| `GOOGLE_AI_API_KEY` | Google AI Studio API Key | `AIzaSy...` |

### 获取 Supabase 配置

1. 访问 https://supabase.com 创建项目
2. 进入项目 → Settings → API
3. 复制 `Project URL` 和 `anon public` Key

### 获取 Gemini API Key

1. 访问 https://aistudio.google.com/app/apikey
2. 点击 **"Create API Key"**
3. 复制 API Key

---

## 🎯 部署后检查

- [ ] 首页加载正常（粉紫渐变 + 浮动爱心）
- [ ] 角色选择页显示 6 个角色
- [ ] 登录流程可用（Mock 模式或真实 Supabase）
- [ ] 认养仪式 3 步流程正常
- [ ] 聊天页 AI 对话正常（需配置 Gemini API）
- [ ] 角色状态页显示好感度/里程碑
- [ ] 个人中心页设置可用
- [ ] 签到&礼物页功能正常

---

## 🐛 常见问题

### 构建失败：useSearchParams() 错误
- ✅ 已修复：Adoption 页面已添加 Suspense 边界

### 构建失败：TypeScript 类型错误
- ✅ 已修复：Gemini API 使用正确的枚举类型

### Supabase 未配置时崩溃
- ✅ 已修复：添加 Mock 客户端支持演示模式

### Gemini API 报错
- 检查 API Key 是否正确
- 确认 API 配额未用完（免费 60 次/分钟）

---

## 📊 项目信息

- **框架**: Next.js 14.1.0
- **语言**: TypeScript + React 18
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Pro
- **部署**: Vercel

---

## 🎉 下一步

1. ✅ 代码完成
2. ✅ 本地构建成功
3. 🔲 推送到 GitHub
4. 🔲 部署到 Vercel
5. 🔲 配置真实环境变量
6. 🔲 集成测试
7. 🔲 上线发布

---

**Made with 💖 by 神兽工作室**
