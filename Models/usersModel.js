const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    userId:{type: Number,require:true},
    firstName:{type: String,require:true},
    lastName:{type: String,require:true},
    subscriptionQuantity: {type: Number,require:true},
    curBorrowedbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    historyBorrowedbooks: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
        borrowedDate: { type: Date, default: Date.now } // שדה לתאריך ההשאלה
    }]
});

module.exports = mongoose.model("user", userSchema);
