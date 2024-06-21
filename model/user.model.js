let mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
        require:true
    }
})

module.exports=mongoose.model("User",userSchema)