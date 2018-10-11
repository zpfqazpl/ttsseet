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
app.use(bodyParser.json());





app.all('*', function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); 
res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); 
res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); 
res.header("X-Powered-By",' 3.2.1') 
if(req.method=="OPTIONS") res.send(200);
/*让options请求快速返回*/ else next(); });





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

const history = require('connect-history-api-fallback');
app.use(history({  rewrites: [    { from: /^\/wap\/.*$/, to: '/index.html' } 
]}));

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
