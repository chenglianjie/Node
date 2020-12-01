const mongoose = require("mongoose");
const appEncrypt = mongoose.Schema({
  username: { type: String,unique:true}, // 账号
  password: { type: String }, // 密码
});
var AppEncrypt = mongoose.model("AppEncrypt",appEncrypt,'appEncrypt')
module.exports = AppEncrypt
