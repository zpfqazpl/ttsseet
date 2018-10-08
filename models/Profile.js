//引入mongoose
const mongoose = require("mongoose");
//实例化Schema
const Schema = mongoose.Schema;
//创建Schema
const ProfileSchema = new Schema({
   type :{
        type:String,
       
    },
    describe :{
        type:String,
       
    },
    expend :{
        type:String,
         required:true
    },
    cash :{
        type:String,
        required:true
    },
    income :{
        type:String,
       required:true
    },
    remark :{
        type:String,
       
    },
    date:{
        type:Date,
        default:Date.now
    }
    
    
    
})

module.exports = Profile = mongoose.model("profile",ProfileSchema);