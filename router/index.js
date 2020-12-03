/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:33:30
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 11:35:18
 */
const fs = require('fs') //引入系统自带的文件模块
// const jwt = require('../middlewares/checkjwt');
exports.init = function(app){
  // jwt鉴权
  // app.use(jwt) 
  // app.use((req,res,next)=>{
  //   console.log('这个token被允许了')
  //   next();
  // })
  // 让前端测试权限是否通过
  // app.use('/kiwisec/test',function(req,res,next){
  //   res.send('token能正常使用')
  // })
  // module里面的路由模块
  var moduleArr = [
    'login',
    'student',
    "apk_encrypt",
  ]
  let tmpModule = null;
  let tmpRoute = null;
  // 遍历引入module里面的router
  for(let i=0;i<moduleArr.length;i++){
    tmpModule=`../modules/${moduleArr[i]}/index.js`;
    // 判断文件模块是否 存在，存在才加载
    if (fs.existsSync(__dirname + "/" + tmpModule)) {
      tmpRoute = require(tmpModule).route;
      if (tmpRoute) {
        app.use(tmpRoute)
      }
    }
  }
}