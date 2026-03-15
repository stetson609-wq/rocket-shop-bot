import { readJSON } from "./storage.js"

export function checkWishlist(shopItems) {

  const wishlist = readJSON("wishlist.json")

  const alerts = []

  for (const wish of wishlist) {

    for (const item of shopItems) {

      const itemMatch =
        item.name.toLowerCase().includes(wish.item.toLowerCase())

      const paintMatch =
        wish.paint === "*" ||
        item.paint.toLowerCase() === wish.paint.toLowerCase()

      if (itemMatch && paintMatch) {

        alerts.push({
          webhook: wish.webhook,
          item
        })

      }

    }

  }

  return alerts
}
