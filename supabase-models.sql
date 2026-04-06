-- ============================================================
-- motoquan 一期半：车型库数据层
-- 执行方式：Supabase Dashboard > SQL Editor > Run
-- ============================================================

-- 1. 品牌表 brand_master
CREATE TABLE IF NOT EXISTS brand_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,              -- 品牌名称，如"春风动力"
  slug TEXT UNIQUE NOT NULL,      -- URL友好别名，如"cfmoto"
  country TEXT,                   -- 国家，如"中国"
  website TEXT,                   -- 官网
  logo_url TEXT,                  -- logo图
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 车型表 bike_model_master
CREATE TABLE IF NOT EXISTS bike_model_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brand_master(id) ON DELETE SET NULL,
  name TEXT NOT NULL,             -- 车型名称，如"450SR"
  slug TEXT UNIQUE NOT NULL,      -- URL友好别名
  category TEXT,                  -- 车型类别：仿赛/街车/ADV/巡航/踏板
  displacement INTEGER,           -- 排量(cc)
  power TEXT,                    -- 功率，如"32kW/8500rpm"
  torque TEXT,                   -- 扭矩
  weight TEXT,                   -- 整备质量
  seat_height INTEGER,           -- 座高(mm)
  fuel_capacity INTEGER,         -- 油箱(L)
  top_speed INTEGER,             -- 最高时速(km/h)
  price TEXT,                    -- 官方售价
  launch_date TEXT,              -- 发布时间
  main_image TEXT,               -- 主图URL
  gallery JSONB DEFAULT '[]',    -- 图集JSON数组
  highlights TEXT[],             -- 亮点标签
  is_hot BOOLEAN DEFAULT false,  -- 热门车型
  is_new BOOLEAN DEFAULT false,  -- 新车
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 文章-车型关联表 article_model_relation
CREATE TABLE IF NOT EXISTS article_model_relation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  model_id UUID REFERENCES bike_model_master(id) ON DELETE CASCADE,
  relation_type TEXT DEFAULT 'mentioned',  -- mentioned/featured/tested/compared
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(article_id, model_id)
);

-- ============================================================
-- 初始化数据：第一批准品牌
-- ============================================================

INSERT INTO brand_master (name, slug, country, description) VALUES
  ('春风动力', 'cfmoto', '中国', 'CFMOTO，A股上市，主打仿赛和ADV车型'),
  ('张雪机车', 'zxmoto', '中国', 'ZXMOTO张雪车队，WSBK冠军车队'),
  ('钱江摩托', 'qjmotor', '中国', 'QJMOTOR，收购贝纳利，旗下有闪系列/赛系列'),
  ('豪爵', 'haojue', '中国', '豪爵铃木，国产通路车销量第一'),
  ('赛科龙', 'saikelong', '中国', '宗申旗下中大排量品牌'),
  ('无极', 'wuji', '中国', '隆鑫旗下中高端品牌'),
  ('五羊本田', 'wuyang-honda', '中国', '广汽&本田合资，中高端踏板和通路车'),
  ('新大洲本田', 'xindazhou-honda', '中国', '新大洲&本田合资')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 初始化数据：第一批准车型
-- ============================================================

-- 先查品牌ID
DO $$
DECLARE
  cf UUID;
  zx UUID;
BEGIN
  SELECT id INTO cf FROM brand_master WHERE slug = 'cfmoto';
  SELECT id INTO zx FROM brand_master WHERE slug = 'zxmoto';

  -- CFMOTO 车型
  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, main_image, highlights)
  VALUES
    (cf, '450SR', 'cfmoto-450sr', '仿赛', 450, '32kW/8500rpm', true, '', ARRAY['入门仿赛','高性价比','轻量化'])
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, main_image, highlights)
  VALUES
    (cf, '500SR', 'cfmoto-500sr', '仿赛', 500, '39kW/8500rpm', true, '', ARRAY['四缸动力','赛道基因','中排量仿赛'])
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, main_image, highlights)
  VALUES
    (cf, '675SR-R', 'cfmoto-675sr-rr', '仿赛', 675, '68kW/11000rpm', true, '', ARRAY['三缸动力','高转性能','赛道利器'])
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, main_image, highlights)
  VALUES
    (cf, 'V4 SR-RR', 'cfmoto-v4-sr-rr', '仿赛', 997, '150kW+', true, '', ARRAY['V4动力','顶级性能','国产巅峰'])
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, main_image, highlights)
  VALUES
    (cf, '800MT-X', 'cfmoto-800mt-x', 'ADV', 800, '70kW', true, '', ARRAY['硬派ADV','长续航','多地形'])
  ON CONFLICT (slug) DO NOTHING;

  -- ZXMOTO 车型
  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, is_new, main_image, highlights)
  VALUES
    (zx, '820RR-RS', 'zxmoto-820rr-rs', '仿赛', 820, '80kW+', true, true, '', ARRAY['WSBK冠军','国产巅峰','张雪之作'])
  ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bike_model_master (brand_id, name, slug, category, displacement, power, is_hot, is_new, main_image, highlights)
  VALUES
    (zx, '500RR', 'zxmoto-500rr', '仿赛', 500, '45kW+', true, true, '', ARRAY['中排量仿赛','轻量化','赛道街道两用'])
  ON CONFLICT (slug) DO NOTHING;

END $$;

-- ============================================================
-- RLS 策略（保持与现有表一致）
-- ============================================================
ALTER TABLE brand_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE bike_model_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_model_relation ENABLE ROW LEVEL SECURITY;

-- brand_master: 公开读
CREATE POLICY "Public read brand_master" ON brand_master FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write brand_master" ON brand_master FOR INSERT WITH CHECK (true);

-- bike_model_master: 公开读
CREATE POLICY "Public read bike_model_master" ON bike_model_master FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write bike_model_master" ON bike_model_master FOR INSERT WITH CHECK (true);

-- article_model_relation: 公开读
CREATE POLICY "Public read article_model_relation" ON article_model_relation FOR SELECT USING (true);
CREATE POLICY "Admin write article_model_relation" ON article_model_relation FOR ALL USING (true);
