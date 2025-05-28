const express = require("express");
const multer = require('multer');
const router = express.Router();
const { getBooksFields,postBook ,getBook, putBook,putBookLender, deleteBook ,getAllBooks } = require("../Controllers/booksController");

  
  // נתיב POST להעלאת קובץ
// router.post('/upload', upload.single('file'), postCsv);
router.get("/getBooksFields", getBooksFields);
// router.post("/postBook", postBook);
router.get("/getBook/:bookId", getBook);
router.get("/getAllBooks", getAllBooks);
router.put("/putBook/:bookId", putBook);
router.put("/putBookLender/:bookId/:userId", putBookLender);
router.delete("/deleteBook/:_id", deleteBook);

// ייצוא ה-router
module.exports = router;
 