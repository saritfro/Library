const mongoose=require("mongoose")
const book=mongoose.schema({
 id:Number,
 bookName:String,
 publishingDate:Date,
 Lender:{ type:mongoose.Schema.Types.ObjectId,ref:"user"}
})
mongoose.exports("book",book)