-- Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  plan TEXT DEFAULT 'free', -- free, starter, pro, agency
  stripe_customer_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Social Accounts
CREATE TABLE social_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  platform TEXT, -- instagram, pinterest, telegram
  access_token TEXT,
  platform_user_handle TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Scheduled Posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  caption TEXT,
  image_url TEXT,
  scheduled_at DATETIME,
  status TEXT DEFAULT 'pending', -- pending, posted, failed
  platform TEXT
);
