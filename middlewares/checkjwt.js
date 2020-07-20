// jwt主要有三部分组成

// header，主要就是存放了你的token类型和你的加密方式。
// playload，一般有签发人，签发时间，过期时间，编号等，这部分是可以添加自己的一些数据进去。
// signature，要生成这个是需要以上两个字段的，还需要一个密钥，这是只有服务端才知道的一个密钥，生成公式HMACSHA256(
// base64UrlEncode(header) + “.” +
// base64UrlEncode(payload),
// secret)
// 上两个字段的base64加上密钥，通过’.‘来进行连接，然后再通过hash256进行加密。
// 以上三个字段再通过’.'来连接的这样就生成了一个token。

// const jwt = require("jsonwebtoken");
// const playload = {
//   name:'clj',
//   time:'2020-07-20'
// }
// const secret = 'cljjwt'
// const token=jwt.sign(playload,secret,{expiresIn:'7day'})
// console.log('我是jwt生成的token',token)

// // 验证
// jwt.verify(token,'cljjwt',(err,decoded)=>{
//   if(err){
//       console.log('jwt验证错误')
//       return
//   }
//   console.log('jwt验证成功',decoded)
// })

// 验证jwt 用的是express-jwt插件
const expressjwt = require('express-jwt');
const key = 'cljjwt';
// unless是不对哪个路由生效， 登录的时候不需要验证token。
const jwtistrue = expressjwt({
  secret:key,
  algorithms:['HS256'],
  credentialsRequired:true // false时 不校验
}).unless({path:['/kiwisec/login','/kiwisec/register']})
module.exports = jwtistrue;