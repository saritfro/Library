const mongoose=require("mongoose")
const book=mongoose.Schema({
 bookId:{type:Number,require:true},
 bookName:String,
 publishingDate:Date,
 Lender:{ type:mongoose.Schema.Types.ObjectId,ref:"user"}
})
module.exports=mongoose.model("book",book)