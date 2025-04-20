const express = require("express");
const router = express.Router();
const { postBook, getBook, putBook, deleteBook,getAllBooks } = require("../Controllers/booksController");

router.post("/postBook", postBook);
router.get("/getBook/:bookId", getBook);
router.get("/getAllBooks", getAllBooks);
router.put("/putBook/:bookId", putBook);
router.delete("/deleteBook/:bookId", deleteBook);

// ייצוא ה-router
module.exports = router;
