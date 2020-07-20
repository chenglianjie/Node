const router = require('express').Router();
const controller = require("../controller");


// 像数据库添加数据
router.post("/kiwisec/login", controller.API.login);

module.exports = router;
