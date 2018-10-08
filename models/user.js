//引入mongoose
const mongoose = require("mongoose");
//实例化Schema
const Schema = mongoose.Schema;
//创建Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String
    },
    jurisdiction :{
        type:String,
        required:true
    }
    
})

module.exports = User = mongoose.model("users",UserSchema);