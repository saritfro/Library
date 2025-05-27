const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    userId:{type: Number,require:true},
    firstName:{type: String,require:true},
    lastName:{type: String,require:true},
    subscriptionQuantity: {type: Number,require:true},
    curBorrowedbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    historyBorrowedbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }]
});

module.exports = mongoose.model("user", userSchema);
