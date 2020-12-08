/*
 * @Descripttion: 封装oss 上传和下载的函数
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-07 14:25:21
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 15:22:49
 */
const oss = require("ali-oss");
const client = new oss({
  bucket:'kiwisec',
  region:'oss-cn-beijing',
  accessKeyId:'LTAI4G59SbYHgmBMcHhK7BvC',
  accessKeySecret:'e3QDOMgXnerng4V6aBq2CyKgiPQhZT',
})
exports.ossUpload = async function put (filename,apkPath) {
  try {
    let result = await client.put('test/' + filename , apkPath);
    console.log('oss上传成功');
  } catch (err) {
    console.log('我是错误',err);
    throw err;
  }
}
exports.ossDownload = async function get (ossFile) {
  try {
    let {res} = await client.get(ossFile);
    console.log('oss下载结果',res.data);
    return res.data;
  } catch (err) {
    console.log ('oss下载错误',err);
    throw err;
  }
}
