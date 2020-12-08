/*
 * @Descripttion: 封装的上传单个文件的中间件
 * @version: 1.0
 * @Author: Jimmy
 * @Date: 2020-12-01 15:02:24
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 15:05:56
 */
const  multer = require("multer");
const path=require('path');
const fs = require("fs");
const OSS = require('ali-oss')
const moment = require("moment");
const mkdirp = require('mkdirp');
const uuid = require('uuid');
const getApkInfo = require("./getApkInfo");
const AppEncrypt = require("../modules/apk_encrypt/model/index");
const session = require("express-session");
const {ossUpload} = require("../middlewares/ossUpload");
const { Console } = require("console");
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
let storage = multer.diskStorage({
  // destination 是用来确定上传的文件应该存储在哪个文件夹中。
  // 也可以提供一个 string (例如 '/tmp/uploads')。
  // 如果没有设置 destination，则使用操作系统默认的临时文件夹。
  destination:async function (req, file, cb) { 
    // 获取当前时间的格式 如 20201201
    let day = moment().format("YYYYMMDD");
    let dir = path.join(__dirname,"../static/apk/"+day);
    console.log("要创建的文件夹dir",dir);
    // 已今天为name创建文件夹
    await mkdirp(dir)
    cb(null,dir);
  },
  // filename 用于确定文件夹中的文件名的确定。 
  // 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
  // 所以要用path模块获取后缀 然后拼接保存起来
  filename: function (req, file, cb) { 
  // console.log("我是filename里面的file",file); 打印信息如下
  //   { 
  //      fieldname: 'file',
  //      originalname: 'earse.jpg',
  //      encoding: '7bit',
  //      mimetype: 'image/jpeg'
  //    }
  // path.extname 获取后缀
  // cb(null,Date.now() + "" + path.extname(file.originalname)); 
  // 去除源文件的空格
  let filename = file.originalname.replace(/\s*/g,"");
  // 时间戳直接加上原来的名字 
    cb(null,Date.now() + "" + filename); 
  }
})
// 一个对象，指定一些数据大小的限制。 更多限制参考官方文档
let limits = { 
  //限制文件大小为100M  1024*1024 为1M
  fileSize: 1024*1024*100,
  //限制文件数量
  files: 10
}
let upload = multer({
  storage:storage,
  // 上传文件的限制
  limits:limits,
// fileFilter 设置一个函数来控制什么文件可以上传以及什么文件应该跳过，
  fileFilter:function(req, file, cb){
    // 打印会出现在上传文件的顶部 
    // console.log('进入筛选的file',file);
    if(file.mimetype === "image/png"){
      req.fileCheckError = {}
      req.fileCheckError['fileFilter'] = '不能上传png格式的图片'
      cb(null, false);
    }else{
      cb(null, true)
    }
  }
});
let singleUpload = upload.single('file');
let manyUpload = upload.array('file',10);
// 封装的单个上传文件的例子 做了一个不能上传png图片的例子
exports.singleUpload = function(req,res){
  singleUpload(req,res,async function(err){
    if(err instanceof multer.MulterError){
      console.log("文件上传出错了MulterError",err)
      res.send({code:0,err});
      return;
    }else if (Object.keys(req.fileCheckError || {}).length > 0) {
      console.log('出错了req.fileCheckError', req.fileCheckError)
      res.send({code:0,err:req.fileCheckError})
    }else if(err){
      console.log("文件上传出错了err",err);
      res.send('文件上传出错了err,上传失败');
    } 
    else{
      console.log("文件上传成功啦啦");
      let filename = req.file.filename
      let day = moment().format("YYYYMMDD");
       // 执行aapt命令需要的路径
       let apkPath = path.join(__dirname,`../static/apk/${day}/${filename}`);
       let aaptPath = path.join(__dirname ,`../utils/win.aapt.exe`);
       let apkboxPath = path.join(__dirname,`../static/apk/${day}`);
       let  ossFile = '';
      // 解析出apk的信息
      try {
        var apkInfo = await getApkInfo(aaptPath,apkPath,apkboxPath);
      } catch (error) {
        console.log(error);
        res.status(400).send({msg:'apk解析失败'})
      }
      // 文件上传成功和解析成功之后 将apk上传到oss
      try {
        ossUpload(filename,apkPath);
        ossFile = 'test/' + filename;
      } catch (error) {
        res.status(400).send({code:0,msg:'文件上传到oss失败'})
      }
      // 数据处理 存在数据库
      let updateTime = new Date();
      let apkSize = (req.file.size/1024/1024).toFixed(2) + "M";
      let version = apkInfo.version;
      let user= req.session.user;
      let u_id = user.userId || "";
      let md5 = uuid.v1();  // 生成唯一的userId
      let obj = {ossFile,md5,u_id,apkSize,updateTime,version,apkName:apkInfo.name,package:apkInfo.package};
      const datas = await AppEncrypt.create(obj);
      // 数据处理 存在数据库 end
      if(datas){
        res.status(200).send({code:'0000',msg:'文件上传成功'})
      }
    }
  })
}
// 封装的多个文件上传
exports.manyUpload = function(req,res){
  manyUpload(req,res,function(err){
    let files = req.files;
    console.log("多文件files",files);
    // 错误判断
    if(err instanceof multer.MulterError){
      console.log("文件上传出错了MulterError",err)
      res.send({code:0,err});
      return;
    }else if (Object.keys(req.fileCheckError || {}).length > 0) {
      console.log('出错了req.fileCheckError', req.fileCheckError)
      res.send({code:0,err:req.fileCheckError})
    }else if(err){
      console.log("文件上传出错了err",err);
      res.send('文件上传出错了err,上传失败');
    } 
    else{
      console.log("文件上传成功");
      res.status(200).send({code:'0000',msg:'文件上传成功'})
    }
  })
}