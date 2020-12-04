/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 15:28:12
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-04 18:33:43
 */

// jwt主要有三部分组成

// header，主要就是存放了你的token类型和你的加密方式。
// playload，一般有签发人，签发时间，过期时间，编号等，这部分是可以添加自己的一些数据进去。
// signature，要生成这个是需要以上两个字段的，还需要一个密钥，这是只有服务端才知道的一个密钥，生成公式HMACSHA256(
// base64UrlEncode(header) + “.” +
// base64UrlEncode(payload),
// secret)
// 上两个字段的base64加上密钥，通过’.‘来进行连接，然后再通过hash256进行加密。
// 以上三个字段再通过’.'来连接的这样就生成了一个token。

const jwt = require("jsonwebtoken");
const signkey = 'jwt-clj';
exports.setToken = function(obj){
  return new Promise((resolve,reject) => {
    // sign 参数一：加密的对象 参数二 加密的规则 参数三：一个对象 里面可以写过期时间等；
    const token = jwt.sign(obj,signkey,{ expiresIn:'2h' });
    if(token){
      resolve(token);
    }else{
      reject("token生成出错了")
    }
  })
}
exports.verifyToken = function(req,res,next){
  let Bearertoken = req.headers.authorization;
  let token = Bearertoken.replace("Bearer","").trim();
  // console.log("后端接收到的token",token);
  jwt.verify(token,signkey,function(err,decode){
    if(err){
      console.log("token验证没有通过，请重新登录");
      res.status(401).send({msg:'非法请求'});
      // res.json({msg:'请重新登录'})
    }else{
      console.log("token验证通过,解析内容为",decode);
      req.session.user = decode;
      next();
    }
  })
}



// // 验证
// jwt.verify(token,'cljjwt',(err,decoded)=>{
//   if(err){
//       console.log('jwt验证错误')
//       return
//   }
//   console.log('jwt验证成功',decoded)
// })

// 验证jwt 用的是express-jwt插件
// const expressjwt = require('express-jwt');
// const { Promise } = require("mongoose");
// const key = 'cljjwt';
// // unless是不对哪个路由生效， 登录，注册，修改密码等不需要验证token。
// const jwtistrue = expressjwt({
//   secret:key,
//   algorithms:['HS256'],
//   credentialsRequired:true // false时 不校验
// }).unless({path:['/kiwisec/login','/kiwisec/register','/kiwisec/updatePassword']})
// module.exports = jwtistrue;