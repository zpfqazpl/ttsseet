

//引入express
const express = require("express")


//实例化一个router

const router = express.Router();
//引入users
const Profile = require("../../models/Profile")



const passport =require("passport")

//$router GET api/profiles/test
//@dest 返回的请求的json数据
//@access  pulic
router.get("/test", (req, res) => {
    res.json({ msg: "1111" })
})

//$router post api/profiles/add
//@dest   创建信息接口
//@access  Private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
   //创立一个新的对象
    const profileFields={}; 
    //判断传递过来的属性是否存在,如果存在赋值
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save()
    .then(profile=>{
        res.json(profile)
    })
})

//$router get api/profiles/
//@dest   获取所有信息
//@access  Private

router.get("/",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
    Profile.find()
    .then(profile=>{
        if(!profile) {
             return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
} )

//$router get api/profiles/:id
//@dest   获取对应id信息
//@access  Private

router.get("/:id",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then(profile=>{
        if(!profile) {
             return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
} )

//$router post api/profiles/edit
//@dest   创建信息接口
//@access  Private
router.post("/edit/:id",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
    //创立一个新的对象
     const profileFields={}; 
     //判断传递过来的属性是否存在,如果存在赋值
     if(req.body.type) profileFields.type = req.body.type;
     if(req.body.describe) profileFields.describe = req.body.describe;
     if(req.body.income) profileFields.income = req.body.income;
     if(req.body.expend) profileFields.expend = req.body.expend;
     if(req.body.cash) profileFields.cash = req.body.cash;
     if(req.body.remark) profileFields.remark = req.body.remark;
 
    Profile.findOneAndUpdate(
        //拿到id
        {_id:req.params.id},
        //更新信息
        {$set:profileFields},
        //新信息
        {new:true}
    ).then(profile=>res.json(profile))
 })
 

 //$router post api/profiles/delete/:id
//@dest   删除信息接口
//@access  Private

router.delete(
    "/delete/:id",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
    //通过ID查找并删除
    Profile.findOneAndRemove(
        {_id:req.params.id}
    )
    .then(profile=>{
        //储存信息
        profile.save()
        //成功返回新的信息
        .then(profile=>res.json(profile))
    })
    //失败返回错误
    .catch(err=>res.status(404).json("删除失败"))
} )
module.exports = router;