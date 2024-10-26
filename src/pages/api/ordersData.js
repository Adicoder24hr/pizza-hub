import Orders from "@/models/ordersData";
import db from "@/utils/db"

export default async function handler(req, res) {

    if(req.method === "POST"){
        await db.connect();
        let data = req.body.order_data;

        await data.splice(0,0,{order_date:req.body.order_date});

        let eID = await Orders.findOne({email: req.body.email});

        if(eID === null){

            try{
                await Orders.create({
                    email: req.body.email, 
                    order_data: [data]
                }).then(()=>{
                    res.json({success: true})
                })
            }
            catch(err){
                res.send("Server Error!");
                console.log(err.messsage);
            }
        }
        else{
            try{
                await Orders.findOneAndUpdate({email: req.body.email}, {$push:{order_data: data}}).then(()=>{
                    res.json({success: true})
                })
            }
            catch(err){
                console.log(err.message);
            }
        }

        await db.disconnect();

    }

  res.status(200).json({ name: "John Doe" });
}