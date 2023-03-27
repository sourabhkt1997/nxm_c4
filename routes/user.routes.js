let express=require("express")

let userrouter=express.Router()

let {UserModel}=require("../model/usermodel")
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')


userrouter.post("/register",async(req,res)=>{
    let {name,email,gender,password,age,city,is_married}=req.body
     
    try{
        let data=await UserModel.find({email})
        if(data.length>0){
            res.status(400).send({"message":"User already exist, please login"})
        }
        else{
            bcrypt.hash(password,5,async(err, hash)=> {
               let data=new UserModel({name:name,email:email,gender:gender,password:hash,age:age,
                city:city,is_married:is_married})
                await data.save()
                res.status(200).send({"message":"new user added"})

            });

        }

    }
    catch(err){
        res.status(400).send({"message":err.message})
    }


})

userrouter.post("/login",async(req,res)=>{
      let {email,password}=req.body
     try{
        let data=await UserModel.find({email})
        if(data.length>0){
            bcrypt.compare(password,data[0].password,(err, result)=>{
                if(result){
                    res.status(200).send({"message":"login successfull",
                "token":token = jwt.sign({userid:data[0]._id},'sourabh')})
                }
                else{
                    res.status(400).send({"message":"wrong credentials"})
                }
            })
        }
        else{
            res.status(400).send({"message":"register first"})
        }

     }
     catch(err){
        res.status(400).send({"message":err.message})
     }

})


module.exports={userrouter}




