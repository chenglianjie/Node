
const  User =  require("../model/index");
const jwt = require("jsonwebtoken");

// 注册
exports.register = async function (req, res) {
  try {
    // 获取用户名和密码
    const {username,password} = req.body;
    console.log("注册的参数",req.body);
    // jwt鉴权，生成token  占时先关闭 11-25
    // let playload= {username,password};
    // const secretkey = 'cljjwt'
    // let token = jwt.sign(playload,secretkey,{expiresIn:'7day'})
    let data = await User.find({username});
    console.log("data",data);
    if(Array.isArray(data) && data.length>0){
      res.status(200).send({code:0, msg:"用户名已存在！"});
      return
    }
    let obj = {username,password}
    User.create(obj,function(error,doc){
      if(error){
        console.log(error);
        console.log('数据添加失败')
        res.status(400).send({code:-1,msg:'注册失败'})
        return;
      }
      console.log('注册数据添加成功')
      res.status(200).send({ code:1,msg:'注册成功'});
    })
  } catch (error) {
    res.status(400),send({code:0,msg:error})
  }

}
// 登录
exports.login = function(req,res){
  try {
    const {username,password} = req.body;
    console.log("前端过来的参数",username,password)
    User.find({username},function(err,docs){
      if(err){
        console.log(err)
        res.status(400).send({code:0,msg:'查询错误'})
        return;
      }
      console.log("docs",docs)
      if(docs[0].password !== password){
        res.status(200).send({code:0,msg:"密码错误",token});
        return;
      }
      let playload= {username,password};
      const secretkey = 'cljjwt';
      let token = jwt.sign(playload,secretkey,{expiresIn:'7day'});
      res.status(200).send({code:1,msg:'登录成功',data:token});
    })
  } catch (error) {
    console.log("我是错误",error)
  }
  
}
// 修改密码
exports.updatePassword = async function (req,res){
  try {
    const {username,oldpassword,newpassword} = req.body;
    const data = await User.findOneAndUpdate({username,password:oldpassword},{password:newpassword});
    console.log("修改代码data",data);
    if(data){
      res.status(200).send({code:1,msg:'修改成功'});
    }else{
      res.status(400),send({code:0,msg:'用户名不存在或密码错误'});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({code:0,msg:error})
  }
}