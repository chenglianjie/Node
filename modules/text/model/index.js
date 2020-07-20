const mongoose = require("mongoose");
const myText = mongoose.Schema({
  name: { type: String }, // 姓名
  age: { type: String }, // 年龄
  sex: { type: String }, // 性别
  grade: { type: String }, // 年纪
});
var Text = mongoose.model("Text",myText)
module.exports = Text
