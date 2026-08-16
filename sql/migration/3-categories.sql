CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- until dev
ALTER TABLE categories
ADD CONSTRAINT categories_name_unique UNIQUE (name);
