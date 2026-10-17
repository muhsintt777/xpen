-- Up Migration
CREATE TABLE IF NOT EXISTS sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(255) NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(
    EPOCH
    FROM
      CURRENT_TIMESTAMP
  )::BIGINT,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(
    EPOCH
    FROM
      CURRENT_TIMESTAMP
  )::BIGINT
);

DROP TRIGGER IF EXISTS trg_sessions_updated_at ON sessions;

CREATE TRIGGER trg_sessions_updated_at
BEFORE UPDATE ON sessions FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

-- Down Migration
DROP TABLE IF EXISTS sessions;
