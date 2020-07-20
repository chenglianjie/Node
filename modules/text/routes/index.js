const router = require('express').Router();
const controller = require("../controller");


// 像数据库添加数据
router.get("/a", controller.API.report);

module.exports = router;
