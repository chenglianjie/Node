/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:14:48
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 10:53:40
 */
var mongoose = require('mongoose'); // 引入mongoose
// 链接数据库方法
var connectMaxNum = 0; //数据库重新连接的次数
var connect = function dbconnect(){
  mongoose.connect('mongodb://192.168.3.88:30000/clj',{
  poolSize: 5, // MongoDB 保持的最大 socket 连接数。 poolSize 的默认值是 5。
  reconnectTries: 5, // 服务器尝试重新连接的次数
  keepAlive: 1, // 在TCP套接字上启动keepAlive之前要等待的毫秒数。
  connectTimeoutMS: 30000, // TCP连接超时设置
  reconnectInterval: 1000, // 服务器将在两次重试之间等待＃毫秒
 },function(err){
   if(err){
    connectMaxNum++
    console.log("mongoDB连接失败,将自动重连5次")
    if(connectMaxNum<=5){
      setTimeout(function(){
        // dbconnect('mongodb://localhost:27017/kiwisec') 本地数据库;
        dbconnect('mongodb://192.168.3.88:30000/kiwisec') //公司3.88数据库;
        console.log(`第${connectMaxNum}次重连`)
      },10000)
    }else{
      console.log("MongoDB链接异常，重连已超过5次")
    }
   }else{
     connectMaxNum = 0;
     console.log("mongoDB 连接成功")
   }
 })
}
module.exports = connect