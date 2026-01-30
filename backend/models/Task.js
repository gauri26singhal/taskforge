const mongoose = require("mongoose");

module.exports = mongoose.model("Task",{
  userId:String,
  title:String,
  priority:String,
  dueDate:String,
  isCompleted:Boolean
});
