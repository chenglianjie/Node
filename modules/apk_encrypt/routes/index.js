/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-04 17:19:55
 */
const router = require('express').Router();
const controller = require("../controller");
const {verifyToken} = require('../../../middlewares/checkjwt')
const {isSession} = require("../../../middlewares/isSession")

router.get("/encryptAndroid/list" , verifyToken , isSession , controller.API.list);
router.get("/encryptAndroid/delect" , verifyToken , isSession , controller.API.del);
router.post("/encryptAndroid/upload",controller.API.upload);

module.exports = router;
