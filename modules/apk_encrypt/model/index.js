/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 16:10:18
 */
const mongoose = require("mongoose");
const appEncrypt = mongoose.Schema({
  version: { type: String}, 
  apkName: { type: String }, 
  package: { type: String }, 
  u_id: { type: String }, 
  updateTime:{type:String},
  apkSize:{type:String},
});
var AppEncrypt = mongoose.model("AppEncrypt",appEncrypt,'appEncrypt')
module.exports = AppEncrypt
