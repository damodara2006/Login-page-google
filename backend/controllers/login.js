import cookieParser, { signedCookie, signedCookies } from "cookie-parser"
// import {cookie-cookieParser}from "cookie-parser"
import jwt from "jsonwebtoken"
const login = async(req,res)=>{
    try {
        const {email, profile} = req.body;
    // console.log(profile)
    const value = jwt.sign({email, profile},"damo")
    // console.log(value)
    const verified = jwt.verify(value,"damo",{maxAge:60000})
    res.cookie("login", value, {
        sameSite: "none",
        secure: true,              // REQUIRED when sameSite is "none"
        httpOnly: true,
        maxAge: 60000
      });
      
    res.send({email,profile})
    } catch (error) {
       console.log(error) 
    }
}

const cookie = (req,res)=>{
    const value = req.cookies.login;
    res.clearCookie("login", {
        sameSite: "none",
        secure: true,
        httpOnly: true
      });
    res.send()
}

export  {login, cookie}