const express = require("express");
const router = express.Router();
const {getAllUsers, postUser, getUser,BorrowUsersBooks,ReturnUsersBooks, updateUserSubscriptions, deleteUser } = require("../Controllers/usersController");

router.post("/postUser", postUser);
router.get("/getUser/:userId", getUser);
router.get("/getAllUsers", getAllUsers);
router.put("/BorrowUsersBooks/:userId/:book_id", BorrowUsersBooks); // נתיב להלוואת ספר
router.put("/ReturnUsersBooks/:userId/:bookId", ReturnUsersBooks); // נתיב להחזרת ספר
router.put("/updateUserSubscriptions/:userId/:quantity", updateUserSubscriptions); // עדכון מנויים
router.delete("/deleteUser/:userId", deleteUser);

// ייצוא ה-router
module.exports = router;
