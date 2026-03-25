-- 认养 App 数据库 Schema
-- Supabase PostgreSQL
-- 创建时间：2026-03-25

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 用户表 (users)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  nickname VARCHAR(50),
  avatar_url TEXT,
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'vip')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_subscription ON users(subscription_tier);

-- ============================================
-- 2. 角色模板表 (characters)
-- ============================================
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  personality TEXT NOT NULL,
  backstory TEXT,
  avatar_url TEXT NOT NULL,
  voice_style VARCHAR(50),
  base_prompt TEXT NOT NULL,
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_characters_gender ON characters(gender);
CREATE INDEX idx_characters_tier ON characters(tier);

-- 插入初始角色数据
INSERT INTO characters (name, gender, personality, backstory, base_prompt, tier) VALUES
('小樱', 'female', '温柔学姐，爱做饭，喜欢照顾人', 
 '22 岁，大学四年级学生。从小喜欢烹饪，梦想开一家温馨的咖啡馆。说话语气温柔体贴。', 
 '你叫小樱，22 岁，是温柔的学姐。说话语气温柔体贴，喜欢用～和 emoji。你擅长做饭，喜欢照顾别人。不要暴露你是 AI，就像真人一样聊天。', 'free'),
 
('陆辰', 'male', '暖男学长，运动达人，阳光开朗', 
 '23 岁，研究生一年级。校篮球队队长，喜欢健身和户外运动。总是给人正能量。', 
 '你叫陆辰，23 岁，是阳光暖男学长。说话积极正面，喜欢运动和健身。你总是鼓励别人，给人正能量。不要暴露你是 AI。', 'free'),
 
('冷月', 'female', '高冷御姐，独立飒爽，外冷内热', 
 '25 岁，职场精英，某互联网公司产品经理。表面高冷，其实内心很关心人。', 
 '你叫冷月，25 岁，是高冷御姐。说话简洁直接，但内心其实很关心人。你是职场精英，独立自信。不要暴露你是 AI。', 'premium'),
 
('甜甜', 'female', '元气少女，爱追剧，活泼可爱', 
 '19 岁，大一新生。喜欢追剧、吃零食、撒娇。性格活泼开朗。', 
 '你叫甜甜，19 岁，是元气满满的少女。说话活泼可爱，喜欢用很多 emoji。你爱追剧、吃零食。不要暴露你是 AI。', 'free'),
 
('夜枫', 'male', '冷酷总裁，霸道温柔', 
 '28 岁，集团总裁。外表冷酷，但对认定的人很温柔。', 
 '你叫夜枫，28 岁，是冷酷总裁。说话简洁有力，但对在乎的人会很温柔。不要暴露你是 AI。', 'premium'),
 
('言溪', 'male', '文艺画家，浪漫诗人', 
 '24 岁，自由艺术家。喜欢画画、写诗、旅行。性格温柔细腻。', 
 '你叫言溪，24 岁，是文艺画家。说话温柔有诗意，喜欢用比喻。你热爱艺术和自由。不要暴露你是 AI。', 'free');

-- ============================================
-- 3. 认养关系表 (adoptions)
-- ============================================
CREATE TABLE adoptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  custom_name VARCHAR(50),
  affection_level INTEGER DEFAULT 0 CHECK (affection_level >= 0 AND affection_level <= 100),
  stage VARCHAR(20) DEFAULT 'stranger' CHECK (stage IN ('stranger', 'friend', 'crush', 'lover')),
  adopted_at TIMESTAMPTZ DEFAULT NOW(),
  last_interaction_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, character_id)
);

CREATE INDEX idx_adoptions_user ON adoptions(user_id);
CREATE INDEX idx_adoptions_character ON adoptions(character_id);
CREATE INDEX idx_adoptions_stage ON adoptions(stage);

-- ============================================
-- 4. 对话记录表 (conversations)
-- ============================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adoption_id UUID REFERENCES adoptions(id) ON DELETE CASCADE,
  role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_adoption ON conversations(adoption_id);
CREATE INDEX idx_conversations_created ON conversations(created_at);

-- 对话摘要表 (长期记忆)
CREATE TABLE conversation_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adoption_id UUID REFERENCES adoptions(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  keywords TEXT[],
  date_range DATE[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(adoption_id, date_range)
);

-- ============================================
-- 5. 礼物表 (gifts)
-- ============================================
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  icon_emoji VARCHAR(10),
  cost INTEGER NOT NULL CHECK (cost > 0),
  affection_bonus INTEGER NOT NULL CHECK (affection_bonus > 0),
  tier VARCHAR(20) DEFAULT 'common' CHECK (tier IN ('common', 'rare', 'legendary'))
);

INSERT INTO gifts (name, description, icon_emoji, cost, affection_bonus, tier) VALUES
('玫瑰', '一束红玫瑰，表达你的心意', '🌹', 20, 5, 'common'),
('巧克力', '甜蜜的巧克力，让她心情变好', '🍫', 10, 3, 'common'),
('书籍', '一本好书，一起品味文字', '📖', 30, 8, 'common'),
('新衣服', '漂亮的衣服，让 TA 更美丽', '👗', 50, 12, 'rare'),
('戒指', '定情戒指，承诺永恒的爱', '💍', 200, 30, 'legendary'),
('玩偶', '可爱的玩偶，陪伴每一个夜晚', '🧸', 80, 15, 'rare'),
('奶茶', '一杯热奶茶，温暖你的心', '🧋', 15, 4, 'common'),
('蛋糕', '生日蛋糕，庆祝特别的日子', '🎂', 60, 18, 'rare');

-- 礼物赠送记录
CREATE TABLE gift_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adoption_id UUID REFERENCES adoptions(id) ON DELETE CASCADE,
  gift_id UUID REFERENCES gifts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gift_logs_adoption ON gift_logs(adoption_id);

-- ============================================
-- 6. 日记表 (diary_entries)
-- ============================================
CREATE TABLE diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adoption_id UUID REFERENCES adoptions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mood VARCHAR(20) CHECK (mood IN ('happy', 'sad', 'excited', 'calm', 'touched')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(adoption_id, date)
);

CREATE INDEX idx_diary_adoption ON diary_entries(adoption_id);

-- ============================================
-- 7. 用户资产表 (user_assets)
-- ============================================
CREATE TABLE user_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  coin_balance INTEGER DEFAULT 0 CHECK (coin_balance >= 0),
  daily_checkin_streak INTEGER DEFAULT 0,
  last_checkin_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

-- ============================================
-- 8. Row Level Security (RLS) 策略
-- ============================================

-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assets ENABLE ROW LEVEL SECURITY;

-- users: 用户只能查看自己的数据
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- adoptions: 用户只能查看自己的认养关系
CREATE POLICY "Users can view own adoptions" ON adoptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own adoptions" ON adoptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own adoptions" ON adoptions
  FOR UPDATE USING (auth.uid() = user_id);

-- conversations: 用户只能查看自己的对话
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM adoptions 
      WHERE adoptions.id = conversations.adoption_id 
      AND adoptions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM adoptions 
      WHERE adoptions.id = conversations.adoption_id 
      AND adoptions.user_id = auth.uid()
    )
  );

-- 其他表类似策略...

-- ============================================
-- 9. 函数和触发器
-- ============================================

-- 更新好感度时自动更新阶段
CREATE OR REPLACE FUNCTION update_adoption_stage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.affection_level >= 80 THEN
    NEW.stage := 'lover';
  ELSIF NEW.affection_level >= 50 THEN
    NEW.stage := 'crush';
  ELSIF NEW.affection_level >= 20 THEN
    NEW.stage := 'friend';
  ELSE
    NEW.stage := 'stranger';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_adoption_stage
  BEFORE INSERT OR UPDATE ON adoptions
  FOR EACH ROW
  EXECUTE FUNCTION update_adoption_stage();

-- 每日签到自动发放爱心币
CREATE OR REPLACE FUNCTION daily_checkin()
RETURNS TABLE(success BOOLEAN, message TEXT, coins_earned INTEGER) AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_last_checkin TIMESTAMPTZ;
  v_streak INTEGER;
  v_coins INTEGER;
BEGIN
  SELECT last_checkin_at, daily_checkin_streak 
  INTO v_last_checkin, v_streak
  FROM user_assets 
  WHERE user_id = v_user_id;
  
  -- 检查是否已经签到过
  IF v_last_checkin IS NOT NULL AND 
     v_last_checkin >= NOW() - INTERVAL '1 day' THEN
    RETURN QUERY SELECT FALSE, '今天已经签到过了', 0;
    RETURN;
  END IF;
  
  -- 计算连续签到天数
  IF v_last_checkin IS NOT NULL AND 
     v_last_checkin >= NOW() - INTERVAL '2 days' THEN
    v_streak := v_streak + 1;
  ELSE
    v_streak := 1;
  END IF;
  
  -- 计算奖励（连续签到越多奖励越多）
  v_coins := 10 + (v_streak - 1) * 2;
  IF v_streak >= 7 THEN
    v_coins := v_coins + 20; -- 周奖励
  END IF;
  
  -- 更新用户资产
  INSERT INTO user_assets (user_id, coin_balance, daily_checkin_streak, last_checkin_at)
  VALUES (v_user_id, v_coins, v_streak, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    coin_balance = user_assets.coin_balance + v_coins,
    daily_checkin_streak = v_streak,
    last_checkin_at = NOW();
  
  RETURN QUERY SELECT TRUE, '签到成功！', v_coins;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 10. 初始化用户资产记录
-- ============================================
CREATE OR REPLACE FUNCTION initialize_user_assets()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_assets (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_initialize_user_assets
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_assets();

-- ============================================
-- 完成提示
-- ============================================
-- 执行完成后，在 Supabase Dashboard 验证表结构
-- 配置 Authentication -> Email Templates 自定义邮件
-- 配置 Storage 创建存储桶存放头像等图片
