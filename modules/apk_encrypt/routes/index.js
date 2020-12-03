/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-03 15:17:21
 */
const router = require('express').Router();
const controller = require("../controller");
const autoFilter = require('../../../middlewares/checkjwt').verifyToken

router.get("/encryptAndroid/list" , controller.API.list);
router.post("/encryptAndroid/upload",controller.API.upload);

module.exports = router;
