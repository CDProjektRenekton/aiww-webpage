// Database configuration
// In production, use PostgreSQL, MySQL, or MongoDB
// For development/demo, using in-memory store

export const DB_CONFIG = {
  development: {
    type: 'memory',
    note: 'In-memory store for development. Data resets on server restart.',
  },
  production: {
    type: 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'aiww_2027',
    user: process.env.DB_USER || 'aiww_admin',
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true',
  }
}

// Database schema reference (for PostgreSQL migration)
export const SCHEMA = `
-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id VARCHAR(50) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  organization VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  country VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  category VARCHAR(50) NOT NULL,
  add_ons JSONB DEFAULT '[]',
  payment_status VARCHAR(20) DEFAULT 'pending',
  amount DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(50) PRIMARY KEY,
  registration_id VARCHAR(50) REFERENCES registrations(id),
  method VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'PHP',
  status VARCHAR(20) DEFAULT 'pending',
  transaction_ref VARCHAR(100),
  gateway_response JSONB,
  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'general',
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content / Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) DEFAULT 'general',
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  body TEXT,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft',
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'editor', 'author')),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Access logs (security)
CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES admin_users(id),
  action VARCHAR(100) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(payment_status);
CREATE INDEX idx_payments_registration ON payments(registration_id);
CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_access_logs_user ON access_logs(user_id);
`

export default DB_CONFIG
