
const  Mytext =  require("../model/index");
const jwt = require("jsonwebtoken");
// 像数据库添加数据 方法
exports.login = function (req, res) {
  // 获取用户名和密码
  const {username,password} = req.body;
  // jwt鉴权，生成token
  let playload= {username,password};
  const secretkey = 'cljjwt'
  let token = jwt.sign(playload,secretkey,{expiresIn:'7day'})
  let obj = {username,password}
  Mytext.create(obj,function(error,doc){
    if(!error){
      console.log('数据添加成功')
      res.send({ code:'0',mas:'添加成功',token});
    }else{
      console.log('数据添加失败')
      res.status(500).send({code:-1,msg:'添加失败'})
    }
  })
}
