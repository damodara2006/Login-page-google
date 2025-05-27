import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173","https://login-page-google.onrender.com"]
}))

export default app