# 📊 Supabase 数据库配置指南

**最后更新**: 2026-03-26 18:40

---

## ✅ 已配置

- **Project URL**: https://mmemlpipjhanjeyuapvb.supabase.co
- **Anon Public Key**: ✅ 已配置
- **数据库密码**: 1IHnCQGEbxURZK8D

---

## 🔧 执行数据库 Schema

### 方式 A: Supabase Dashboard（推荐）

1. 访问 https://supabase.com/dashboard/project/mmemlpipjhanjeyuapvb
2. 左侧菜单 → **SQL Editor**
3. 点击 **"New query"**
4. 复制并粘贴 `/workspace/adopt-app/supabase-schema.sql` 文件内容
5. 点击 **"Run"** 执行
6. 确认所有表创建成功

### 方式 B: 使用 Service Role Key

1. 获取 Service Role Key：
   - 访问 https://supabase.com/dashboard/project/mmemlpipjhanjeyuapvb/settings/api
   - 复制 **service_role** Key（⚠️ 保密！不要提交到 Git）

2. 执行 SQL（需要 psql 或 Supabase CLI）

---

## 📋 验证表创建

执行以下 SQL 检查表是否创建成功：

```sql
-- 查看所有表
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 应该看到：
-- users
-- characters
-- adoptions
-- conversations
-- gifts
-- diary_entries
-- ...
```

---

## 🔐 环境变量配置

### 本地开发 (.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mmemlpipjhanjeyuapvb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZW1scGlwamhhbmpleXVhcHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTQ0ODcsImV4cCI6MjA5MDA5MDQ4N30.tyjElb_73wZAeDJ_1phzblYVr5dnaxcTs_-b2G2SOk4
GOOGLE_AI_API_KEY=待配置
```

### Vercel 部署

在 Vercel Dashboard → Settings → Environment Variables 添加：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mmemlpipjhanjeyuapvb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `GOOGLE_AI_API_KEY` | (待配置) |

---

## 🎯 下一步

1. ✅ Supabase 项目已创建
2. ✅ 环境变量已配置
3. 🔲 执行 SQL Schema（手动）
4. 🔲 获取 Google AI API Key
5. 🔲 部署到 Vercel

---

## 📚 相关文档

- [supabase-schema.sql](./supabase-schema.sql) - 数据库建表脚本
- [DEPLOY.md](./DEPLOY.md) - 完整部署指南
- [QUICK_START.md](./QUICK_START.md) - 快速开始

---

**Made with 💖 by 神兽工作室**
