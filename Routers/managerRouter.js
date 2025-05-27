const express = require("express");
const { loginAdministrator, verifyToken } = require("../Controllers/jwtMiddleware");
const router = express.Router();

const { postSettings, putSettings } = require("../Controllers/settingsController");
const { deleteBook, postBook,putBook } = require("../Controllers/booksController");

// מסלול לכניסת מנהלת או ספרנית
router.post("/login", loginAdministrator);

// הגדרת נתיבים עבור ניהול הגדרות
router.post("/postSettings", verifyToken, postSettings);

router.put("/putSettings", verifyToken, putSettings);

//פעולות של ניהול ספרים
// דוגמה לקריאות לפעולות מתוך bookRouter עם אימות
router.delete("/deleteBook/:_id", verifyToken, deleteBook);

router.put("/putBook/:bookId", verifyToken, putBook);

router.post("/postBook", verifyToken, postBook);

module.exports = router;