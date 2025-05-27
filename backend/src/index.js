import app from "./app.js";
import router from "../route/index.js";

app.use(router)
app.listen(8080,()=>{
    console.log("Server running in port : 8080")
})