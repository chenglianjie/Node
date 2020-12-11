/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 15:22:54
 */

const  AppEncrypt =  require("../model/index");
const upload = require("../../../middlewares/upload");
const {ossDownload} = require("../../../middlewares/ossUpload");

// table 数据
exports.list =async function(req,res){
  const {apkName='',state,startTime,endTime} = req.query;
  console.log("接收前端的参数",req.query);
  let filterObj = {};
  if(startTime&&endTime){
    filterObj.updateTime = {
      $gte:new Date(`${startTime} 00:00:00`),
      $lte:new Date(`${endTime} 23:59:59`),
    }
  }
  if(apkName){
    filterObj.apkName = {$regex:apkName};
  }
  if(state !== "all" && state){
    filterObj.state = state;
  }
  console.error("我是保存到session的user  list",req.session.user);
  const data = await AppEncrypt.find(filterObj).sort({"updateTime":-1});
  res.send({code:'0000',data:data});
}
// 删除数据
exports.del = async function (req,res){
 const {md5=''} = req.query;
//  console.log("md5",md5)
 if(md5){
   let result = await AppEncrypt.find({md5});
   if(result){
    await AppEncrypt.deleteOne({md5});
    res.status(200).send({code:1,msg:'删除成功'})
   }
 }else{
  res.status(200).send({code:0,msg:"请传入md5"})
 }
}
// 上传apk
exports.upload = async function(req,res){
  // console.error("我是保存到session的user  upload",req.session.user);
  let type = "encryptApk"
  upload.singleUpload(req,res,type);
}
// 下载apk  有点问题 占时先屏蔽掉
// exports.download = async function(req,res){
//   try {
//     const {ossFile=""} = req.query
//     console.log("前端传过来的ossFile",ossFile)
//     const result = await ossDownload(ossFile);
//     res.send({data:result,msg:'下载成功',code:1})
//   } catch (error) {
//     res.status(400).send({code:0,msg:'下载失败'});
//   }
// }
