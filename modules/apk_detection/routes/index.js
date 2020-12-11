/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-30 18:00:18
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 11:31:38
 */
const router = require('express').Router();
const controller = require("../controller");
const {verifyToken} = require('../../../middlewares/checkjwt')
const existSession = require("../../../middlewares/isSession").isSession
// verifyToken 为解析token中间件  isSession 判断session在不在 不在的话把解析tokne里面的信息 放在session里面 
// token 和 session 过期时间都是两个小时

// 已经上传的apk列表
// router.get("/detectionAndroid/list" , verifyToken , existSession , controller.API.list);
// 删除apk
// router.get("/detectionAndroid/delect" , verifyToken , existSession , controller.API.del);
// 上传apk 以及解析 上传到oss
router.post("/detectionAndroid/upload",verifyToken, existSession, controller.API.upload);
// 下载apk 暂时有问题 先屏蔽
// router.get("/encryptAndroid/download",verifyToken, existSession, controller.API.download);

module.exports = router;
