/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 16:05:28
 */

const  AppEncrypt =  require("../model/index");
const upload = require("../../../middlewares/upload")
const OSS = require('ali-oss');

// table 数据
exports.list =async function(req,res){
  const data = await AppEncrypt.find({}).sort({"updateTime":-1});
  res.send({code:'0000',data:data});
}
exports.upload = async function(req,res){
  upload.singleUpload(req,res);
}
