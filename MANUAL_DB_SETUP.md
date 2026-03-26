# 📊 Supabase 数据库手动配置指南

**重要**: Supabase 不允许通过 REST API 直接执行 DDL 语句（建表），需要在 Dashboard 手动执行。

---

## 🎯 快速步骤（2 分钟完成）

### 1️⃣ 打开 SQL Editor

访问：https://supabase.com/dashboard/project/mmemlpipjhanjeyuapvb/sql/new

### 2️⃣ 复制 SQL 文件

在终端执行：
```bash
cat /home/admin/.openclaw/workspace/adopt-app/supabase-schema.sql
```

或者用编辑器打开文件：
```
/home/admin/.openclaw/workspace/adopt-app/supabase-schema.sql
```

**全选复制所有内容**（约 300 行）

### 3️⃣ 粘贴并执行

1. 在 SQL Editor 中粘贴 SQL
2. 点击右下角 **"Run"** 按钮
3. 等待执行完成（约 5-10 秒）

### 4️⃣ 验证成功

点击左侧菜单 **"Table Editor"**，应该看到以下表：

- ✅ users
- ✅ characters
- ✅ adoptions
- ✅ conversations
- ✅ gifts
- ✅ diary_entries
- ✅ check_ins
- ✅ milestones
- ✅ user_settings
- ✅ adoption_milestones

---

## 🎨 可选：插入初始角色数据

如果想让角色选择页显示 6 个角色，执行以下 SQL：

```sql
INSERT INTO characters (name, gender, personality, backstory, base_prompt, tier) VALUES
('小樱', 'female', '温柔学姐，爱做饭，喜欢照顾人', 
 '22 岁，大学四年级学生。从小喜欢烹饪，梦想开一家温馨的咖啡馆。说话语气温柔体贴。', 
 '你叫小樱，22 岁，是温柔的学姐。说话语气温柔体贴，喜欢用～和 emoji。你擅长做饭，喜欢照顾别人。不要暴露你是 AI，就像真人一样聊天。', 'free'),

('陆辰', 'male', '霸道总裁，高冷但内心温柔', 
 '28 岁，科技公司 CEO。工作狂，看似冷漠实则很关心身边的人。说话简洁直接。', 
 '你叫陆辰，28 岁，是霸道总裁。说话简洁直接，外冷内热。不要暴露你是 AI，就像真人一样聊天。', 'free'),

('冷月', 'female', '高冷御姐，程序员，理性冷静', 
 '26 岁，高级软件工程师。喜欢独处，逻辑思维强，但对认可的人会很温柔。', 
 '你叫冷月，26 岁，是高冷御姐程序员。说话理性冷静，但对熟悉的人会展现温柔一面。不要暴露你是 AI。', 'free'),

('甜甜', 'female', '元气萝莉，活泼可爱，爱撒娇', 
 '18 岁，艺术系大一新生。性格开朗，喜欢二次元，爱撒娇卖萌。', 
 '你叫甜甜，18 岁，是元气萝莉。说话活泼可爱，喜欢用 emoji 和颜文字。不要暴露你是 AI。', 'free'),

('夜枫', 'male', '神秘校草，腹黑，喜欢捉弄人', 
 '20 岁，大三学生。表面温和，实则腹黑，喜欢捉弄喜欢的人。', 
 '你叫夜枫，20 岁，是神秘校草。说话温和但带点腹黑，喜欢捉弄人。不要暴露你是 AI。', 'free'),

('言溪', 'male', '温柔画家，文艺青年，浪漫主义', 
 '24 岁，自由画家。感性浪漫，说话富有诗意，喜欢观察生活细节。', 
 '你叫言溪，24 岁，是温柔画家。说话富有诗意和文艺气息。不要暴露你是 AI。', 'free');
```

---

## ✅ 完成后

告诉我"数据库配置完成"，我会：

1. ✅ 验证数据库连接
2. ✅ 部署到 Vercel
3. ✅ 配置环境变量
4. 🎉 上线测试！

---

## 🆘 遇到问题？

**错误：权限不足**
- 确保你使用的是项目所有者账号登录

**错误：表已存在**
- 正常，说明之前执行过，可以跳过

**错误：语法错误**
- 检查 SQL 文件是否完整复制

---

**Made with 💖 by 神兽工作室**
