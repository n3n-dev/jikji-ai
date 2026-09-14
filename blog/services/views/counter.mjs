import { DatabaseSync } from 'node:sqlite';
import { createHmac, randomBytes } from 'node:crypto';

export function createCounter(path) {
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS counts (post TEXT PRIMARY KEY, total INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS visits (post TEXT, visitor TEXT, seen INTEGER NOT NULL, PRIMARY KEY(post,visitor));
    CREATE INDEX IF NOT EXISTS visits_seen ON visits(seen);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);`);
  db.prepare('INSERT OR IGNORE INTO settings VALUES (?,?)').run('salt', randomBytes(32).toString('hex'));
  const salt = db.prepare('SELECT value FROM settings WHERE key=?').get('salt').value;
  function increment(post, visitor, now = Date.now()) {
      const hash = createHmac('sha256', salt).update(post + ':' + visitor).digest('hex');
      db.exec('BEGIN IMMEDIATE');
      try {
        db.prepare('DELETE FROM visits WHERE seen <= ?').run(now - 1800000);
        const existing = db.prepare('SELECT seen FROM visits WHERE post=? AND visitor=?').get(post, hash);
        if (!existing) {
          db.prepare('INSERT INTO visits VALUES (?,?,?)').run(post, hash, now);
          db.prepare('INSERT INTO counts VALUES (?,1) ON CONFLICT(post) DO UPDATE SET total=total+1').run(post);
        }
        const total = db.prepare('SELECT total FROM counts WHERE post=?').get(post).total;
        db.exec('COMMIT');
        return total;
      } catch (error) {
        db.exec('ROLLBACK');
        throw error;
      }
  }
  const total = post => db.prepare('SELECT total FROM counts WHERE post=?').get(post)?.total ?? 0;
  return {
    visit: increment,
    // Namespace shares separately; existing view records need no migration.
    share(post, visitor, now = Date.now()) { return increment('share:' + post, visitor, now); },
    totals(post) { return {views:total(post), shares:total('share:' + post)}; },
    close() { db.close(); }
  };
}
