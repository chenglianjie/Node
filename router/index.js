const fs = require('fs') //引入系统自带的文件模块
exports.init = function(app){
  // module里面的模块
  var moduleArr = [
    'text',
    'student',
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