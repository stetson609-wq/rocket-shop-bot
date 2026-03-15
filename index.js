import axios from "axios"

export async function sendAlert(webhook,item){

 try{

 await axios.post(webhook,{
  embeds:[
   {
    title:"Wishlist Item Found",
    description:`${item.paint} ${item.name} is in the shop`,
    image:{url:item.image},
    fields:[
     {
      name:"Price",
      value:`${item.price} Credits`,
      inline:true
     }
    ],
    color:5763719
   }
  ]
 })

 }catch(e){
  console.log("Webhook error",e.message)
 }

}
