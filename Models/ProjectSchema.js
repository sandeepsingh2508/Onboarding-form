const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  projectDuration: {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
  },
  employeeId:{
    type:mongoose.Schema.ObjectId,
    ref:'Employee',
    required:true
  }
});
module.exports = mongoose.model("Project", ProjectSchema);
