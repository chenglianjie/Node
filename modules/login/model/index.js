const mongoose = require("mongoose");
const myText = mongoose.Schema({
  username: { type: String,unique:true}, // 账号
  password: { type: String }, // 密码
});
var User = mongoose.model("User",myText,'user')
module.exports = User
