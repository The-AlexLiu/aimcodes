// D1 conditional updates preserve Netlify Blobs' atomic create / ETag contract.
export function createD1Store(db) {
  return {
    async get(key) {
      const row = await db.prepare('SELECT value FROM records WHERE key = ?').bind(key).first()
      return row ? JSON.parse(row.value) : null
    },
    async getWithMetadata(key) {
      const row = await db.prepare('SELECT value, version FROM records WHERE key = ?').bind(key).first()
      return row ? { data: JSON.parse(row.value), etag: String(row.version) } : null
    },
    async setJSON(key, value, options = {}) {
      const encoded = JSON.stringify(value)
      let statement
      if (options.onlyIfNew) {
        statement = db.prepare('INSERT OR IGNORE INTO records (key, value, version) VALUES (?, ?, 1)').bind(key, encoded)
      } else if (options.onlyIfMatch) {
        statement = db.prepare('UPDATE records SET value = ?, version = version + 1 WHERE key = ? AND version = ?').bind(encoded, key, Number(options.onlyIfMatch))
      } else {
        statement = db.prepare('INSERT INTO records (key, value, version) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET value = excluded.value, version = records.version + 1').bind(key, encoded)
      }
      const result = await statement.run()
      return { modified: result.meta.changes > 0 }
    },
  }
}
