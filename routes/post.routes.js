let express=require("express")

let postrouter=express.Router()

let {PostModel}=require("../model/postmodel")
let jwt = require('jsonwebtoken')


postrouter.post("/add",async(req,res)=>{
          console.log(req.body,"***************")
    try{
        let data=new PostModel(req.body)
        await data.save()
        res.status(200).send({"message":"new post added"})
    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
})

postrouter.get("/",async(req,res)=>{
    let{device}=req.query
    console.log(device)
    try{
    let token=req.headers.authorization.split(" ")[1]
    if(token){
    let decoded=jwt.verify(token,"sourabh")
        if(decoded){
            let data=await PostModel.find({"userid":decoded.userid})
            res.status(200).send(data)
        }
        else{
            res.status(400).send({"message":"user has not created any post yet"})
        }
    }
    else{
        res.status(400).send({"message":"login first"})
    }
        
    }
    catch(err){
        res.status(400).send({"message":err.message})
    }
})

postrouter.patch("/update/:id",async(req,res)=>{
      let {id}=req.params
    try{
        let token=req.headers.authorization.split(" ")[1]
        if(token){
        let decoded=jwt.verify(token,"sourabh")
            if(decoded){
               await PostModel.findByIdAndUpdate({_id:id},req.body)
               res.status(200).send({"message":"post updated"})
            }
            else{
                res.status(400).send({"message":"not able to update"})
            }
        }
        else{
            res.status(400).send({"message":"cant able to update"})
        }
            
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
    
})

postrouter.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    try{
        let token=req.headers.authorization.split(" ")[1]
        if(token){
        let decoded=jwt.verify(token,"sourabh")
            if(decoded){
               await PostModel.findByIdAndDelete({_id:id})
               res.status(200).send({"message":"post deleted"})
            }
            else{
                res.status(400).send({"message":"not able to delete"})
            }
        }
        else{
            res.status(400).send({"message":"login first"})
        }
            
        }
        catch(err){
            res.status(400).send({"message":err.message})
        }
})



module.exports={postrouter}
