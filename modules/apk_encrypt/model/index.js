/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 14:50:17
 */
const moment = require("moment")
const mongoose = require("mongoose");
const appEncrypt = mongoose.Schema({
  version: { type: String}, 
  apkName: { type: String }, 
  package: { type: String }, 
  state: { type: String,default:"default"}, 
  u_id: { type: String }, 
  md5: { type: String }, 
  updateTime:{type:Date,},
  apkSize:{type:String},
  ossFile:{type:String},
});
var AppEncrypt = mongoose.model("AppEncrypt",appEncrypt,'appEncrypt')
module.exports = AppEncrypt
