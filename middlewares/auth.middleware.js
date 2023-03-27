
let jwt=require('jsonwebtoken')


let auth=(req,res,next)=>{
   
    let token=req.headers.authorization
    if(token){
        let decoded=jwt.verify(token.split(" ")[1],"sourabh")
        if(decoded){
            console.log(decoded)
            req.body.userid=decoded.userid
            console.log(req.body)
            next()
        }
        else{
            res.status(200).send({"message":"please login first"})
        }
    }
    else{
        res.status(200).send({"message":"please login first"})
    }
}

module.exports={auth}