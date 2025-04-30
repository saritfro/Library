const mongoose=require("mongoose")
const book=mongoose.Schema({
 bookId:{type:Number,require:true},
 bookName:String,
 publishingDate:Date,
 publisher:String,
 author:String,
 lendingDate:Date,
 copiesNum:Number,
category:{
    type:String,
    enum:["אנגלית","פעוטות","ילדים","נוער","מבוגר","שואה","עיוני"]
},
status:{
    type:String,
    enum:["זמין","מושאל"]
},
 Lender:{ type:mongoose.Schema.Types.ObjectId,ref:"user"}
})
module.exports=mongoose.model("book",book)
