var express = require('express');        // 引入express
var router = require('./router/index.js') //引入路由
var connectDB = require('./models/connectMongoDB') // 引入连接数据库方法
var bodyParser=require("body-parser");  // 引入bodyparser中间件
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