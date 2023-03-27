let mongoose=require("mongoose")

let postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:{
        type:String,
        enum:["Laptop", "Tablet", "Mobile"]
    },
    no_of_comments:Number,
    userid:String
},{
    versionKey:false
})

PostModel=mongoose.model("postdatas",postSchema)

module.exports={PostModel}