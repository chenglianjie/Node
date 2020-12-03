/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:29:51
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 14:56:30
 */
const mongoose = require("mongoose");
const myText = mongoose.Schema({
  username: { type: String}, // 账号
  password: { type: String }, // 密码
  userId: {type: String},
  createTime: { type: String},
  updateTime: { type: String},
  registerType: { type: String},
});
var User = mongoose.model("User",myText,'user')
module.exports = User
