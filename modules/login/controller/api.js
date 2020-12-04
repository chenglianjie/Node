/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:29:51
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-04 18:19:25
 */

const  User =  require("../model/index");
const moment = require("moment");
const uuid = require('uuid');
const session = require("express-session");
const jwt = require('../../../middlewares/checkjwt');

// 注册
exports.register = async function (req, res) {
  try {
    // 获取用户名和密码
    const {username,password} = req.body;
    console.log("注册的参数",req.body);
    let data = await User.find({username});
    console.log("data",data);
    if(Array.isArray(data) && data.length>0){
      res.status(200).send({code:0, msg:"用户名已存在！"});
      return
    }
    // 用户的类型 手机号注册还是说邮箱注册
    let registerType = 'tel';
    if(/@/.test(username)){
      registerType = 'email';
    }
    let userId = uuid.v1();  // 生成唯一的userId
    // 注册的时间
    let createTime = moment().format("YYYY-MM-DD  HH:mm:ss");
    // 更新密码的时间
    let updateTime = ''
    let obj = {username,password,userId,createTime,updateTime,registerType}
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
exports.login = async function(req,res){
  try {
    const {username,password} = req.body;
    console.log("前端过来的参数",username,password)
    const data = await User.findOne({username});
    console.log("返回的data",data)
    if(data){
      if(data.password !== password){
        res.status(200).send({code:0,msg:"密码错误"});
        return;
      }
      let obj ={userId:data.userId,username:data.username}
      let token = await jwt.setToken(obj);
      req.session.user = obj;
      // console.log("token",token)
      console.log("登录里面的session",req.session.user)
      res.status(200).send({code:1,msg:'登录成功',data:token});
    }else{
      res.status(400).send({msg:"用户名不存在"})
    }
      // let playload= {username,userId:docs[0].userId};
      // req.session.user = playload;
      // const secretkey = 'cljjwt';
      // let token = jwt.sign(playload,secretkey,{expiresIn:'7day'});
      // res.status(200).send({code:1,msg:'登录成功',data:token});
    // })
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