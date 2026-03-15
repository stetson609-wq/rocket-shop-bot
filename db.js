import Database from "better-sqlite3"

const db = new Database("database.db")

db.prepare(`
CREATE TABLE IF NOT EXISTS wishlist (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 item TEXT,
 paint TEXT,
 webhook TEXT,
 last_alert INTEGER
)
`).run()

export default db
