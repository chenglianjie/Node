/*
 * @Descripttion: 封装的上传单个文件的中间件
 * @version: 1.0
 * @Author: Jimmy
 * @Date: 2020-12-01 15:02:24
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-01 18:13:46
 */
const  multer = require("multer");
const path=require('path');
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
let storage = multer.diskStorage({
  // destination 是用来确定上传的文件应该存储在哪个文件夹中。
  // 也可以提供一个 string (例如 '/tmp/uploads')。
  // 如果没有设置 destination，则使用操作系统默认的临时文件夹。
  destination: function (req, file, cb) { 
    cb(null, 'public/img/');
  },
  // filename 用于确定文件夹中的文件名的确定。 
  // 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
  // 所以要用path模块获取后缀 然后拼接保存起来
  filename: function (req, file, cb) { 
    console.log("我是filename里面的file",file); 
    // path.extname 获取后缀
    cb(null,Date.now() + "" + path.extname(file.originalname)); 
  }
})
// 一个对象，指定一些数据大小的限制。 更多限制参考官方文档
let limits = { 
  //限制文件大小为100M  1024*1024 为1M
  fileSize: 1024*124*100,
  //限制文件数量
  files: 5
}
let upload = multer({
  storage:storage,
  // 上传文件的限制
  limits:limits,
// fileFilter 设置一个函数来控制什么文件可以上传以及什么文件应该跳过，
  fileFilter:function(req, file, cb){
    // 打印会出现在上传文件的顶部 
    console.log('进入筛选的file',file);
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
  singleUpload(req,res,function(err){
    // console.log('有没有我的参数',req.file,req.body)
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
      // put(req.file.filename)
      res.status(200).send({code:'0000',msg:'文件上传成功'})
    }
  })
}
// 封装的多个文件上传
exports.manyUpload = function(req,res){
  let files = req.files;
  console.log("多文件files",files);
  if (files.length === 0) {
    res.render("error", {message: "上传文件不能为空！"});
    return
} else {
    manyUpload(req,res,function(err){
      // console.log('有没有我的参数',req.file,req.body)
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
        // put(req.file.filename)
        res.status(200).send({code:'0000',msg:'文件上传成功'});
      }
    })
  }
}