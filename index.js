import express from "express"
import fs from "fs"
import {fetchShop} from "./scraper.js"
import {getWishes,addWish,deleteWish} from "./wishlist.js"
import {sendAlert} from "./webhook.js"

const app=express()

app.use(express.json())
app.use(express.static("public"))

function readCache(){

 if(!fs.existsSync("shopCache.json")) return []

 return JSON.parse(fs.readFileSync("shopCache.json"))

}

function writeCache(data){

 fs.writeFileSync("shopCache.json",JSON.stringify(data,null,2))

}

async function checkShop(){

 try{

 const shop=await fetchShop()

 const prev=readCache()

 if(JSON.stringify(shop)===JSON.stringify(prev)) return

 console.log("shop updated")

 writeCache(shop)

 const wishes=getWishes()

 for(const wish of wishes){

  for(const item of shop){

   const nameMatch=item.name.toLowerCase().includes(wish.item.toLowerCase())

   const paintMatch=
    wish.paint==="*"||
    item.paint.toLowerCase()===wish.paint.toLowerCase()

   if(nameMatch&&paintMatch){

    await sendAlert(wish.webhook,item)

   }

  }

 }

 }catch(e){

 console.log("scraper error",e.message)

 }

}

setInterval(checkShop,60000)

checkShop()

app.get("/api/shop",async(req,res)=>{

 const shop=await fetchShop()

 res.json(shop)

})

app.get("/api/wishlist",(req,res)=>{

 res.json(getWishes())

})

app.post("/api/wishlist",(req,res)=>{

 const {item,paint,webhook}=req.body

 addWish(item,paint,webhook)

 res.json({success:true})

})

app.delete("/api/wishlist/:id",(req,res)=>{

 deleteWish(req.params.id)

 res.json({success:true})

})

app.listen(process.env.PORT||3000,()=>{

 console.log("server running")

})
