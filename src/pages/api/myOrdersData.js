import Orders from "@/models/ordersData";
import db from "@/utils/db"

export default async function handler(req, res) {

    if(req.method === "POST"){
        await db.connect();

        try{
            let data = await Orders.findOne({email: req.body.email});
            res.json({order_data: data})
        }
        catch(err){
            console.log(err.message);
            res.send("Server error: " + err.message);
        }

        await db.disconnect();
    }
}