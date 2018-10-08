const express = require("express")
//实例化一个app
const app = express();
//引入mongoose
const mongoose =require("mongoose")

//引入passport
const passport = require("passport")

//passport初始化
app.use(passport.initialize());
//引入body-parser
const bodyParser = require("body-parser")
//使用body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
//引入users.js

const users= require("./routes/api/users")
//引入profile
const profiles= require("./routes/api/profiles")
//db config
const db =require("./config/keys").mongoURI
//连接数据库 
mongoose.connect(db)
//成功打印 MongoDB Connected
.then(()=>{
    console.log("MongoDB Connected")
 //失败打印 错误提示
})
.catch(err=>{
   console.log(err)
})

//配置passpost
require("./config/passport")(passport);

//用中间件使用路由!
// //使用routes
app.use("/api/users",users)
app.use("/api/profiles",profiles)


//设置端口
const port = process.env.PORT || 5000;
//设置路由
// app.get("/",(req,res)=>{
//     res.send("hello world!!")
// })
//监听端口
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})