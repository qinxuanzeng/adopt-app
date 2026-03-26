# 🚀 部署到 Vercel - 快速指南

**数据库状态**: ✅ 已完成  
**代码状态**: ✅ 已推送到 GitHub  
**GitHub 仓库**: https://github.com/qinxuanzeng/adopt-app

---

## 📋 部署步骤（3 分钟）

### 1️⃣ 访问 Vercel

打开：https://vercel.com/new

### 2️⃣ 导入 GitHub 仓库

1. 点击 **"Import Git Repository"**
2. 找到 **qinxuanzeng/adopt-app** 仓库
3. 点击 **"Import"**

### 3️⃣ 配置环境变量

展开 **"Environment Variables"**，添加以下 3 个变量：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mmemlpipjhanjeyuapvb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZW1scGlwamhhbmpleXVhcHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTQ0ODcsImV4cCI6MjA5MDA5MDQ4N30.tyjElb_73wZAeDJ_1phzblYVr5dnaxcTs_-b2G2SOk4` |
| `GOOGLE_AI_API_KEY` | （可选，暂时留空） |

### 4️⃣ 点击 Deploy

点击 **"Deploy"** 按钮，等待 2-3 分钟。

### 5️⃣ 完成！

部署成功后，Vercel 会提供一个域名，例如：
```
https://adopt-app-xxx.vercel.app
```

---

## ✅ 验证部署

访问部署后的域名，测试以下功能：

- [ ] 首页加载正常（粉紫渐变背景 + 浮动爱心）
- [ ] 角色选择页显示 6 个角色
- [ ] 点击角色可以进入认养仪式
- [ ] 登录流程可用
- [ ] 聊天页可以发送消息

---

## 🔧 可选：配置 Google AI API Key

如果想启用 AI 对话功能：

1. 访问：https://aistudio.google.com/app/apikey
2. 点击 **"Create API Key"**
3. 复制 Key
4. 在 Vercel Dashboard → Settings → Environment Variables
5. 添加 `GOOGLE_AI_API_KEY` 变量
6. 重新部署（Deployments → Redeploy）

---

## 🎉 完成！

部署成功后，把 Vercel 域名发给我，我会继续测试和优化！

---

**Made with 💖 by 神兽工作室**
