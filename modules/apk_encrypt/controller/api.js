/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-01 18:16:19
 */

const  AppEncrypt =  require("../model/index");
const upload = require("../../../middlewares/upload")
let OSS = require('ali-oss');

// table 数据
exports.list = function(){
  // AppEncrypt.find({});
  console.log('list');
}
exports.upload = function(req,res){
  upload.singleUpload(req,res);
}
