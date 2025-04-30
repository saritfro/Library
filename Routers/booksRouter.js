const express = require("express");
const router = express.Router();
const { postBook,postCsv ,getBook, putBook,putBookLender, deleteBook ,getAllBooks } = require("../Controllers/booksController");

router.post("/postBook", postBook);
router.post("/postCsv", postCsv);
router.get("/getBook/:bookId", getBook);
router.get("/getAllBooks", getAllBooks);
router.put("/putBook/:bookId", putBook);
router.put("/putBookLender/:bookId/:userId", putBookLender);
router.delete("/deleteBook/:bookId", deleteBook);

// ייצוא ה-router
module.exports = router;
