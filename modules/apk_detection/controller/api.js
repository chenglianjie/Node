/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 11:36:36
 */
const upload = require("../../../middlewares/upload");
// 上传apk
exports.upload = async function(req,res){
  let type = "detectionApk"
  upload.singleUpload(req,res,type);
};
