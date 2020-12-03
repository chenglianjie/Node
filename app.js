/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:07:39
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 16:18:28
 */
var express = require('express');        // 引入express
var router = require('./router/index.js') //引入路由
var connectDB = require('./models/connectMongoDB') // 引入连接数据库方法
var bodyParser=require("body-parser");  // 引入bodyparser中间件
const session = require("express-session")
var app = express()
var port = 3030;  //监听端口
// 连接数据库
connectDB();
//设置跨域访问 简单直接 暴力 也可以用cors中间件
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin',req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials",true); //带cookies 不设置如果前端带了cookie之类的 依然会报跨域问题
    // res.header("Content-Type", "application/json;charset=utf-8"); 
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });
  // ------------------------------跨域问题 end-----------------
app.use(bodyParser.json())  // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
      maxAge:30*24*60*60*1000    /*过期时间*/
  },   /*secure https这样的情况才可以访问cookie*/
  //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))
// 路由模块
router.init(app)           
// 错误处理 
app.use(function(err, req, res, next) {
  res.send(err)
})
// 监听的端口
app.listen(port,()=>{
  console.log(`this app is listen ${port}`)
})