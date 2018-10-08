
//引入passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
//引入mongoose
const mongoose = require("mongoose");
//引入users
 const users= require("../routes/api/users");
 //引入usr模型
const User = mongoose.model("users");
//引入加密规则
const keys = require("../config/keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//设置加密规则
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{


    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {

        // console.log(jwt_payload)
        //通过id查找用户
        User.findById(jwt_payload.id)

        .then(user=>{

            //如果用户存在返回
            if(user){
                return done (null,user)
            }
            //如果用户不存在返回
            return done (null,false)
        })
        .catch(err=>{console.log(err)})
    }));
}