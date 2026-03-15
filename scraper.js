import axios from "axios"
import cheerio from "cheerio"

export async function fetchShop() {

  const { data } = await axios.get("https://rlshop.gg")

  const $ = cheerio.load(data)

  const items = []

  $("img").each((i, el) => {

    const src = $(el).attr("src")
    const alt = $(el).attr("alt")

    if (!src || !alt) return
    if (!src.includes("item")) return

    const parentText = $(el).parent().text()

    const priceMatch = parentText.match(/(\d+)\s*Credits/i)

    const price = priceMatch ? Number(priceMatch[1]) : null

    const nameParts = alt.split(" ")

    let paint = "None"
    let name = alt

    if (nameParts.length > 1) {
      paint = nameParts[0]
      name = nameParts.slice(1).join(" ")
    }

    items.push({
      id: alt.toLowerCase().replace(/\s+/g, "-"),
      name,
      paint,
      price,
      image: src
    })

  })

  return items
}
