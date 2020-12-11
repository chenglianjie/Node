/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:29:51
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-10 14:20:42
 */
const router = require('express').Router();
const controller = require("../controller");


// 像数据库添加数据
router.get("/list",(req,res)=>{
  res.send([
    {name:'几维安全',value:'1001',key:1},
    {name:'阿里巴巴',value:'1002',key:2},
    {name:'京东数科',value:'1003',key:3}
  ])
})
router.post("/kiwisec/register", controller.API.register);
router.post("/kiwisec/login", controller.API.login);
router.post("/kiwisec/updatePassword", controller.API.updatePassword);

module.exports = router;
