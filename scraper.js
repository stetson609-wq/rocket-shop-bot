import axios from "axios"
import cheerio from "cheerio"

export async function fetchShop(){

 const {data}=await axios.get("https://rlshop.gg")

 const $=cheerio.load(data)

 const items=[]

 $("img").each((i,el)=>{

  const src=$(el).attr("src")
  const alt=$(el).attr("alt")

  if(!src||!alt) return
  if(!src.includes("item")) return

  const parent=$(el).parent().text()

  const priceMatch=parent.match(/(\d+)\s*Credits/i)

  const price=priceMatch?Number(priceMatch[1]):0

  const parts=alt.split(" ")

  let paint="None"
  let name=alt

  if(parts.length>1){
    paint=parts[0]
    name=parts.slice(1).join(" ")
  }

  items.push({
    id:alt.toLowerCase().replace(/\s+/g,"-"),
    name,
    paint,
    price,
    image:src
  })

 })

 return items
}
