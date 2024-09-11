const express = require("express")
const dotenv = require("dotenv")
const ConnectDB = require("./database/connectDB")
const userRoutes = require("./Routes/UserRoutes")
dotenv.config()
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.json({
        msg:"Server is Running"
    })
})
app.use("/api",userRoutes)
ConnectDB().then(
    app.listen(port,()=>{
        console.log(`Server is running in ${port}`);
        
    })
)
