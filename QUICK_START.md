# 🚀 快速部署指南

**构建状态**: ✅ 成功  
**代码状态**: ✅ 已提交到 Git

---

## 📦 方案 A: 一键部署脚本（推荐）

```bash
cd /home/admin/.openclaw/workspace/adopt-app
./deploy.sh
```

脚本会自动：
1. ✅ 检查 Git 配置
2. ✅ 引导创建 GitHub 仓库
3. ✅ 推送代码
4. ✅ 可选：部署到 Vercel

---

## 📦 方案 B: 手动部署

### 1️⃣ 创建 GitHub 仓库

访问：https://github.com/new

- 仓库名：`adopt-app`
- 可见性：Private（推荐）或 Public
- **不要** 勾选"Add a README file"

### 2️⃣ 推送代码

```bash
cd /home/admin/.openclaw/workspace/adopt-app

# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/adopt-app.git

# 推送
git push -u origin master
```

### 3️⃣ 部署到 Vercel

访问：https://vercel.com/new

1. 点击 **"Import Git Repository"**
2. 找到 `adopt-app` 仓库，点击 **Import**
3. 配置环境变量（见下方）
4. 点击 **"Deploy"**

---

## 🔐 环境变量（必须配置）

在 Vercel 项目设置 → Environment Variables 中添加：

| 变量名 | 值 | 获取方式 |
|--------|-----|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | [Supabase](https://supabase.com) → 项目 → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | 同上 |
| `GOOGLE_AI_API_KEY` | `AIzaSy...` | [Google AI Studio](https://aistudio.google.com/app/apikey) |

---

## ✅ 验证部署

部署完成后，访问 Vercel 提供的域名，测试以下功能：

- [ ] 首页加载正常（粉紫渐变）
- [ ] 角色选择页显示 6 个角色
- [ ] 登录流程可用
- [ ] 认养仪式 3 步流程
- [ ] 聊天页 AI 对话（需配置 API）
- [ ] 角色状态页
- [ ] 个人中心页
- [ ] 签到&礼物页

---

## 🐛 遇到问题？

查看 `DEPLOY.md` 的"常见问题"部分。

---

**Made with 💖 by 神兽工作室**
