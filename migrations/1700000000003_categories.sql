-- Up Migration
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Down Migration
DROP TABLE IF EXISTS categories;
