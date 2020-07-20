
const  Mytext =  require("../model/index");
// 像数据库添加数据 方法
exports.report = function (req, res) {
  res.send('hellos')
  let obj = {name:'敏敏',age:'22',sex:'女',grade:'已毕业'}
  Mytext.create(obj,function(error,doc){
    if(!error){
      console.log('数据添加成功')
      res.send({ code:'0',mas:'添加成功'});
    }else{
      console.log('数据添加失败')
      res.status(500).send({code:-1,msg:'添加失败'})
    }
  })
}

