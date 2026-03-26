# 📊 Supabase 数据库配置指南

**创建时间**: 2026-03-26  
**状态**: ⚠️ 需要 Service Role Key

---

## ✅ 已完成的配置

- **Project URL**: https://mmemlpipjhanjeyuapvb.supabase.co
- **Anon Public Key**: ✅ 已配置
- **数据库密码**: 1IHnCQGEbxURZK8D
- **PostgreSQL 客户端**: ✅ 已安装 (brew)
- **Python psycopg2**: ✅ 已安装

---

## ⚠️ 当前问题

服务器无法直接连接 Supabase 的 PostgreSQL 端口（5432），因为：
1. Supabase 数据库只允许通过内网或 SSL 连接
2. 需要 **Service Role Key** 才能执行 DDL 语句（建表）

---

## 🔑 解决方案

### 方案 A: 在 Supabase Dashboard 执行 SQL（推荐 ⭐）

**步骤：**

1. 访问：https://supabase.com/dashboard/project/mmemlpipjhanjeyuapvb/sql/new

2. 复制 SQL 文件内容：
   ```bash
   cat /home/admin/.openclaw/workspace/adopt-app/supabase-schema.sql
   ```

3. 粘贴到 SQL Editor

4. 点击 **"Run"** 执行

5. 验证成功：
   - 左侧菜单 → Table Editor
   - 应该看到 10 张表：
     - users
     - characters
     - adoptions
     - conversations
     - gifts
     - diary_entries
     - check_ins
     - milestones
     - user_settings
     - adoption_milestones

**预计时间**: 2 分钟

---

### 方案 B: 提供 Service Role Key

如果主人想让我自动执行，需要提供 **Service Role Key**：

1. 访问：https://supabase.com/dashboard/project/mmemlpipjhanjeyuapvb/settings/api

2. 复制 **service_role** Key（⚠️ 保密！）
   - 格式：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZW1scGlwamhhbmpleXVhcHZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUxNDQ4NywiZXhwIjoyMDkwMDkwNDg3fQ...`

3. 告诉我 Key，我会：
   - 更新 `.env.local` 添加 `SUPABASE_SERVICE_ROLE_KEY`
   - 用 HTTP API 执行 SQL Schema
   - 验证表创建成功

**预计时间**: 1 分钟

---

## 📝 环境变量清单

### 已配置 ✅
```bash
NEXT_PUBLIC_SUPABASE_URL=https://mmemlpipjhanjeyuapvb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 待配置 🔲
```bash
SUPABASE_SERVICE_ROLE_KEY=待提供
GOOGLE_AI_API_KEY=待配置（可选）
```

---

## 🎯 下一步

1. 🔲 执行 SQL Schema（方案 A 或 B）
2. 🔲 部署到 Vercel
3. 🔲 配置 Google AI API Key（可选）
4. 🎉 上线测试

---

## 📚 相关文档

- [supabase-schema.sql](./supabase-schema.sql) - 数据库建表脚本
- [DEPLOY.md](./DEPLOY.md) - 完整部署指南
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 配置说明

---

**Made with 💖 by 神兽工作室**
