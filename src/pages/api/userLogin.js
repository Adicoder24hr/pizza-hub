import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const jwtSecret = "$2a$10$Q8hvtD.";

export default async function handler(req, res) {

 let success = false;

 if(req.method === "POST"){
    await db.connect();

    const {email, password} = req.body;
    try{

        let user = await Users.findOne({email});

        if(!user){
            return res.status(400).json({
                success, error: "invalid Email!"
            });
        };

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({
                success,
                error: "Incorrect password!"
            });
        }

        const data = {
            user:{
                id: user["_id"]
            }
        }

        const authToken = jwt.sign(data, jwtSecret);
        const isAdmin = await user.isAdmin;
        success = true;
        res.json({
            success: success,
            authToken: authToken,
            isAdmin: isAdmin
        });

    }catch(err){
        console.log(err.message);
        res.send("Server Error");
    }

 }

  res.status(200).json({ name: "John Doe" });
}
