/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:07:39
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 15:59:03
 */
var express = require('express');        // 引入express
var router = require('./router/index.js') //引入路由
var connectDB = require('./models/connectMongoDB') // 引入连接数据库方法
var bodyParser=require("body-parser");  // 引入bodyparser中间件
const session = require("express-session");

var app = express()
var port = 3030;  //监听端口
//配置session的中间件
app.use(session({
  secret: 'cljsession', //服务器端生成 session 的签名
  name:"nodeSession", //修改session对应cookie的名称
  resave: false, //强制保存 session 即使它并没有变化
  saveUninitialized: true, //强制将未初始化的 session存储
  cookie: { 
      maxAge:1000*60*120, // 过期时间和token一样 是两个小时
      secure: false  // true 表示只有https协议才能访问cookie  
  },
  rolling:true  //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}));
// 连接数据库
connectDB();
// 开放静态资源
app.use(express.static('public'))
//设置跨域访问 简单直接 暴力 也可以用cors中间件
app.use(function (req, res, next) {
    // console.log("req.headers.origin",req.headers.origin);
    res.header('Access-Control-Allow-Origin',req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials",true); //带cookies 不设置如果前端带了cookie之类的 依然会报跨域问题
    // res.header("Content-Type", "application/json;charset=utf-8"); 
    next();
    // if (req.method == 'OPTIONS') {
    //   res.send(200);
    // }
    // else {
    //   next();
    // }
  });
  // ------------------------------跨域问题 end-----------------
app.use(bodyParser.json())  // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// 路由模块
router.init(app)           
// 错误处理 
app.use(function(err, req, res, next) {
  console.log("err",err)
  res.send(err)
})
// 监听的端口
app.listen(port,()=>{
  console.log(`this app is listen ${port}`)
})