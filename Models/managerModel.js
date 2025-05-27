const mongoose=require("mongoose");
const managerSchema=mongoose.Schema({
    name:{type:String,require:true},
    password:{type:String,require:true},
    // refreshToken:{type:String,require:true},
    role: { type: String, default: 'manager' ,immutable: true}
    // תפקיד המנהל, ברירת מחדל היא 'manager'
});
module.exports=mongoose.model("manager",managerSchema);
// This code defines a Mongoose schema for a manager model in a Node.js application.
// The schema includes fields for the manager's name and password, both of which are required.