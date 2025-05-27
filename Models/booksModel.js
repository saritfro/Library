const mongoose=require("mongoose")
const Settings = require("../Models/settingsModel.js"); 

const book=mongoose.Schema({
 bookId:{type:Number,require:true},
 bookName:String,
 publishingDate:Date,
 publisher:String,
 author:String,
 lendingDate:Date,
 copyNumber:Number,
    category: {
            type: String,
        },

status:{
    type:String,
    enum:["בתחזוקה","זמין","מושאל"]
},
 Lender:{ type:mongoose.Schema.Types.ObjectId,ref:"user"},
 borrowedDate: { type: Date, default: Date.now } // שדה לתאריך ההשאלה

})
module.exports=mongoose.model("book",book)
