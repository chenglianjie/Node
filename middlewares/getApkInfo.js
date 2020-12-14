/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-02 17:04:35
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-14 19:02:53
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-02 11:58:00
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-02 17:03:05
 */
const execSync = require("child_process").execSync;
const path = require("path");
var ApkReader = require('adbkit-apkreader')
var fs = require('fs')
const util = require("util");
const moment = require("moment")
const mkdirp = require('mkdirp');
const renameAsync = util.promisify(fs.rename);
// var ApkReader = require('adbkit-apkreader')
// var fs = require('fs')
module.exports = async function (aaptPath, apkPath, apkboxPath) {
  let cmd = `${aaptPath}  dump badging ${apkPath}`;
  if(process.platform==="linux"){
    cmd = `chmod +x ${aaptPath}  dump badging ${apkPath}`
  } 
  try {
    results = execSync(cmd)
  } catch (error) {
    throw error;
  }
  let result = results.toString();
  // result 是获取的结果
  let arr = result.split('\n')
  let appInfo = {};
  let packageArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (/^package:/.test(arr[i])) {
      packageArr = arr[i].split("'");
      appInfo.package = packageArr[1] ? packageArr[1] : '';
      appInfo.version = packageArr[5] ? packageArr[5] : '';
    } else if (/^application:/.test(arr[i])) {
      labelArr = arr[i].split('=');
      appInfo.name = labelArr[1].replace('\'', '').replace('\' icon', '');
      appInfo.icon = labelArr[2] ? labelArr[2].replace(/\'/g, '') : '';
    }
  }
  appInfo.icon = appInfo.icon.replace(/\r/g, '');
  let iconName = appInfo.icon;  // res/mipmap-mdpi/ic_launcher.png
  try {
    // 解析apk的图片 解析出来默认在根路径
  let reader = await ApkReader.open(apkPath);
  let image = await reader.readContent(iconName);
  fs.writeFileSync("image.png", image);
  // 创建一个以今天日期的文件夹 放图片
  let day = moment().format("YYYYMMDD");
  let dir = path.join(__dirname, "../public/img/" + day);
  await mkdirp(dir);
  var oldImgPath = path.join(__dirname, "../image.png");
  let newname = Date.parse(new Date()); //给图片命名为时间
  var newImgPath = path.join(dir, `${newname}image.png`);
  fs.renameSync(oldImgPath, newImgPath)
  appInfo.icon = `${newname}image.png`
  console.log("解析的apk信息", appInfo);
  return appInfo;
  } catch (error) {
    console.log("我是解析移动错误",error)
    throw error;
  }
  
  // 移动图片在这里
  // ApkReader.open(apkPath)
  // .then(  function (reader) {
  //   reader.readContent(iconName).then( function (image) {
  //     try {
  //       console.log('解析的img', image); // 这里是一个二进制的数据
  //       fs.writeFile("image.png", image,async (err) => {
  //         if (err) {
  //           throw err;
  //         } else {
  //           // 创建一个以今天日期的文件夹 放图片
  //           let day = moment().format("YYYYMMDD");
  //           let dir = path.join(__dirname, "../public/img/" + day);
  //           await mkdirp(dir);
  //           var oldImgPath = path.join(__dirname, "../image.png");
  //           let newname = Date.parse(new Date()); //给图片命名为时间
  //           var newImgPath = path.join(dir, `${newname}image.png`);
  //           // 移动图片在这里
  //           fs.rename(oldImgPath, newImgPath,(err)=>{
  //               if(err){
  //                 throw err
  //               }else{
  //                 appInfo.icon = `${newname}image.png`
  //                 console.log("图片移动重命名成功")
  //                  // 解析apk图片 end
  //                 console.log("解析的apk信息", appInfo);
  //                 return appInfo;
  //               }
  //           })  
  //         }
  //       });
  //     } catch (error) {
  //       console.error("图片解析移动失败", error);
  //       throw error;
  //     }
  //   });
  // })

};

