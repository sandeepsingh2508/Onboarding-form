const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  issuingOrganisation: {
    type: String,
  },
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  employeeId:{
    type:mongoose.Schema.ObjectId,
    ref:"Employee",
    required:true
  }
});
module.exports = mongoose.model("Course", CourseSchema);
