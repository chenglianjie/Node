const router = require('express').Router();
const controller = require("../controller");

router.post("/encryptAndroid/list", controller.API.list);
router.post("/encryptAndroid/upload", controller.API.upload);

module.exports = router;
