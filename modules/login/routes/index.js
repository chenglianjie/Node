/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-07-20 11:29:51
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 12:37:55
 */
const router = require('express').Router();
const controller = require("../controller");


// 像数据库添加数据
router.post("/kiwisec/register", controller.API.register);
router.post("/kiwisec/login", controller.API.login);
router.post("/kiwisec/updatePassword", controller.API.updatePassword);

module.exports = router;
