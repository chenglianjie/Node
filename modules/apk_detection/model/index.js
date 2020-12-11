/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 15:17:57
 */
const mongoose = require("mongoose");
const appDetections = mongoose.Schema({
  version: { type: String}, 
  apkName: { type: String }, 
  package: { type: String }, 
  state: { type: String,default:"default"}, 
  u_id: { type: String }, 
  md5: { type: String }, 
  updateTime:{type:Date,},
  apkSize:{type:String},
  apkIcon:{type:String},
  ossFile:{type:String,default:"default"},
});
var appDetection = mongoose.model("appDetection",appDetections,'appDetection')
module.exports = appDetection
