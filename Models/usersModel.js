const mongoose=require("mongoose")
const user=mongoose.schema({
 id:Number,
 firstName:String,
 lastName:String,
 subscriptionQuantity:String,
 borrowedbooks:[{ type:mongoose.Schema.Types.ObjectId,ref:"book"}]
})
mongoose.exports("user",user)