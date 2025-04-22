const mongoose=require("mongoose")
const book=mongoose.Schema({
 bookId:{type:Number,require:true},
 bookName:String,
 publishingDate:Date,
 publisher:String,
 lendingDate:Date,
category:{
    type:String,
    enum:["אנגלית","פעוטות","ילדים","נוער","מבוגר","שואה","עיוני"]
},
 Lender:{ type:mongoose.Schema.Types.ObjectId,ref:"user"}
})
module.exports=mongoose.model("book",book)
