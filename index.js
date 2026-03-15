import { fetchShop } from "./scraper.js"
import { checkWishlist } from "./wishlist.js"
import { sendWebhook } from "./webhook.js"
import { readJSON, writeJSON } from "./storage.js"

async function run() {

  try {

    const shop = await fetchShop()

    const previous = readJSON("shop.json")

    const shopChanged =
      JSON.stringify(shop) !== JSON.stringify(previous)

    if (!shopChanged) {
      console.log("No shop change")
      return
    }

    console.log("Shop updated")

    writeJSON("shop.json", shop)

    const alerts = checkWishlist(shop)

    for (const alert of alerts) {
      await sendWebhook(alert.webhook, alert.item)
    }

  } catch (err) {
    console.error("Run error:", err)
  }

}

setInterval(run, 60000)

run()
