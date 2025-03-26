const express = require("express");
const router = express.Router();
const { postBook, getBook, putBook, deleteBook } = require("../Controllers/booksController");

router.post("/postBook", postBook);
router.get("/getBook/:bookId", getBook);
router.put("/putBook/:bookId", putBook);
router.delete("/deleteBook/:bookId", deleteBook);

// ייצוא ה-router
module.exports = router;
