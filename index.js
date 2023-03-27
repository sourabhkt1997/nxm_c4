let express=require("express")
let app=express()
app.use(express.json())
let {connection}=require("./db")
require("dotenv").config()
let {userrouter}=require("./routes/user.routes")
let {postrouter}=require("./routes/post.routes")
let {auth}=require("./middlewares/auth.middleware")
let cors=require("cors")
app.use(cors())

app.use("/users",userrouter)
app.use(auth)
app.use("/posts",postrouter)



app.listen(process.env.port,async(req,res)=>{

    try{
        await connection
        console.log(`server is running in port ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})
