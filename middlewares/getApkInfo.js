/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-02 17:04:35
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 14:30:22
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

// var ApkReader = require('adbkit-apkreader')
// var fs = require('fs')

module.exports = function(aaptPath,apkPath,apkboxPath){
  console.log("__dirname",__dirname)
  // let aaptPath = path.join(__dirname,'../../aapt/win.aapt.exe');
  // let apkPath = path.join(__dirname,'../../static/apk/youku.apk');
  let cmd = `${aaptPath} dump badging ${apkPath}`;
  console.log("我是路径",aaptPath,apkPath);
  result = execSync(cmd).toString();
  // result 是获取的结果
  // console.log("apk包的全部解析信息",result)
  let arr = result.split('\n')
  let appInfo = {};
  let packageArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (/^package:/.test(arr[i])) {
      packageArr = arr[i].split("'");
      appInfo.package = packageArr[1]?packageArr[1]:'';
      appInfo.version = packageArr[5] ? packageArr[5] : '';
    } else if (/^application:/.test(arr[i])) {
      labelArr = arr[i].split('=');
      appInfo.name = labelArr[1].replace('\'', '').replace('\' icon', '');
      appInfo.icon = labelArr[2] ? labelArr[2].replace(/\'/g, '') : '';
    }
  }
  console.log("解析出来的apk信息",appInfo)
  return appInfo;
  // ApkReader.open(apkPath)
  //   .then(function(reader) {
  //       reader.readContent(appInfo.icon).then(function(image) {
  //           console.log(image)
  //           fs.writeFile("image.png", image, function(err) {
  //               if (err) {
  //                   console.log(err)
  //               } else {
  //                   console.log('success')
  //               }
  //           });
  //       })
  //   })

  // let icon = appInfo.icon;
  // 解析出icon
  // let cmdStr = 'unzip -o ' + apkPath + ' ' + icon;
  // let img = execSync(cmdStr,{timeout:10000,shell:''})
  // console.log("img",img);
  // let cmd = `${absolutPath} dump badging C:\\Users\\123\\Desktop\\express-text\\aapt\\youku.apk`;
  // result = execSync(cmd,{cwd:__dirname + '/aapt'}).toString();
  // console.log("result",result)
  // res.send(result)
  // exec(cmd,function(err,data,dataerr){
  //   if(err){
  //     console.log("err",err)
  //     console.log("datataerr",dataerr)
  //   }else{
  
  //     res.send(appInfo);
  //   }
  // });
};

