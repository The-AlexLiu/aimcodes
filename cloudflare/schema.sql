CREATE TABLE IF NOT EXISTS records (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL CHECK(json_valid(value)),
  version INTEGER NOT NULL DEFAULT 1
);
