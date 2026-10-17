-- Up Migration
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  CONSTRAINT categories_name_unique UNIQUE (name)
);

-- Down Migration
DROP TABLE IF EXISTS categories;
