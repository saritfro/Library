const express = require("express");
const multer = require('multer');
const router = express.Router();
const {getSettings, postSettings ,putSettings} = require("../Controllers/settingsController");


router.post("/postSettings", postSettings);
router.get("/getSettings", getSettings);
router.put("/putSettings", putSettings);

// ייצוא ה-router
module.exports = router;
 