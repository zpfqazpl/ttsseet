//@@@@用于登录和注册

//引入express
const express = require("express")
//引入 bcrypt加密
const bcrypt = require("bcryptjs")
//引入 jwt 
const jwt = require('jsonwebtoken');
//实例化一个router

const router = express.Router();
//引入users
const user = require("../../models/user")

//引入gravatar
const gravatar = require('gravatar')

const passport =require("passport")
const keys = require("../../config/keys")
//$router GET api/usres/test
//@dest 返回的请求的json数据
//@access  pulic
router.get("/test", (req, res) => {
    res.json({ msg: "login in!!!" })
})
//$router POST api/usres/register
//@dest 返回的请求的json数据
//@access  pulic

router.post("/register", (req, res) => {
    //  console.log(req.body)
    //查询数据库中是否拥有邮箱

    user.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册!" )
            } else {

                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                    jurisdiction :req.body.jurisdiction 

                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash

                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    });
                   
                });
               
            }
        })

})

//$router POST api/usres/login
//@dest 返回的请求的json数据
//@access  pulic
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    user.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json( "用户不存在!" )
            }
               
            //密码匹配

            bcrypt.compare(password, user.password)
            .then(isMatch=>{
                
                if(isMatch){
                    const rule ={
                        id:user.id,
                        name:user.name,
                        avatar:user.avatar,
                        jurisdiction :user.jurisdiction
                    }
                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                        if(err) throw err; 
                        res.json({
                          
                            success:true,
                            token:"Bearer "+token
                        })
                    })
                }else{
                   
                    return res.status(400).json("密码错误!!")
                }
            })
            
        })


})
//$router GET api/usres/current
//@dest return current user
//@access  Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        name:req.user.name,
        id:req.user.id,
        email:req.user.email,
        jurisdiction :req.user.jurisdiction
    })
})

module.exports = router;