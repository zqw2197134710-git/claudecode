-- ============================================================
-- 烤肉餐厅官网 — 所有表迁移
-- 在 Supabase Dashboard → SQL Editor 中执行
-- ============================================================

-- 1. 联系表单留言
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon inserts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);

-- 2. 餐品分类
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INT DEFAULT 0
);
INSERT INTO categories (name, slug, sort_order) VALUES
  ('烤肉', 'grill', 1),
  ('水果', 'fruit', 2),
  ('果汁', 'juice', 3),
  ('饮料', 'drinks', 4),
  ('小吃', 'snacks', 5);

-- 3. 菜品
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id BIGINT REFERENCES categories(id),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image TEXT,
  description TEXT,
  is_recommended BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 预约
CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon inserts" ON reservations
  FOR INSERT TO anon WITH CHECK (true);

-- 5. 订单
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(10,2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon inserts" ON orders
  FOR INSERT TO anon WITH CHECK (true);
