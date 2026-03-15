import db from "./db.js"

export function addWish(item, paint, webhook) {

  db.prepare(`
  INSERT INTO wishlist (item,paint,webhook,last_alert)
  VALUES (?,?,?,0)
  `).run(item,paint,webhook)

}

export function getWishes() {
  return db.prepare("SELECT * FROM wishlist").all()
}

export function deleteWish(id) {

  db.prepare("DELETE FROM wishlist WHERE id=?").run(id)

}
