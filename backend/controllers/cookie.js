import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const findcookie = async(req,res)=>{
    const value = req.cookies.login;
    let data
    if(value){
        data = await jwt.verify(value,"damo")
    }
    if(data){
        res.send(data)
    }

    
}

export default findcookie