const mongoose = require("mongoose");

const SettingsModel = mongoose.Schema({
    subscriptionValidity:{type: Number,require:true},//תוקף מנוי בחודשים
    loanDuration:{type: Number,require:true},//אורך זמן השאלה בשבועות
    lateFee:{type: String,require:true},//   קנס לאיחור בשקלים
    categories:{type: Array,require:true},
    choosedFields:{type:Array,require:true},
    managerPass:{type: String,require:true},
    numOfBookTosubscription:{type: Number,require:true}
});

module.exports = mongoose.model("Settings", SettingsModel);
