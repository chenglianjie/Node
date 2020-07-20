const mongoose = require("mongoose");
const myText = mongoose.Schema({
  username: { type: String }, // 账号
  password: { type: String }, // 密码
});
var Text = mongoose.model("Text",myText)
module.exports = Text
