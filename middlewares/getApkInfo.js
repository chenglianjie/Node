/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-02 17:04:35
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 14:28:07
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
  let cmd = `${aaptPath} dump badging ${apkPath}`;
  try {
    results = execSync(cmd)
  } catch (error) {
    // console.log("出错啦",error)
    throw error;
    return;
  }
  let result = results.toString();
  // result 是获取的结果
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
  console.log("解析的apk信息",appInfo);
  return appInfo;
};

