const mongoose = require("mongoose");

module.exports = mongoose.model("Habit",{
  userId:String,
  name:String,
  streak:Number,
  lastCompleted:String
});
