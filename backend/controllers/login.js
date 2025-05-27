import cookieParser, { signedCookie, signedCookies } from "cookie-parser"
// import {cookie-cookieParser}from "cookie-parser"
import jwt from "jsonwebtoken"
const login = async(req,res)=>{
    try {
        const {email, profile} = req.body;
    // console.log(profile)
    const value = jwt.sign({email, profile},"damo")
    // console.log(value)
    const verified = jwt.verify(value,"damo",{maxAge:60000, sameSite:"None"})
    res.cookie("login",value)
    res.send({email,profile})
    } catch (error) {
       console.log(error) 
    }
}

const cookie = (req,res)=>{
    const value = req.cookies.login;
    res.clearCookie("login")
    res.send()
}

export  {login, cookie}