/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-04 14:35:33
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-04 15:24:13
 */
const express = require("express");
const router = express.Router();
const url = require("url")
//判断用户有没有登录
exports.isSession = (req, res, next) => {
  try {
    var pathname = url.parse(req.url).pathname
    // 看有没有session 没有的话 就重新登录
    console.error("判断session有没有的中间件",req.session.user);
    if (req.session.user && req.session.user.username) {
        next()
    }else{
        if (pathname=="/login"){
          next()
        }else{
          res.status("401").send({msg:"登录信息已过期，请重新登录"});
        }
    }
  } catch (error) {
    console.log(error)
    res.status("401").send({msg:'用户验证失败，请重新登录'});
  }     
};