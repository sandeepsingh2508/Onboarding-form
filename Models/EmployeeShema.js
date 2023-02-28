const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = new mongoose.Schema({
  GeneralInformation: {
    fullName: {
      type: String,
    },
    Heading: { type: String },
  },
  skills: {
    skillName: String,
    yearsOfExperience: Number,
  },

  Experience: {
    companyName: {
      type: String,
    },
    position: {
      type: String,
    },
    dateOfJoining: {
      type: Date,
    },
    dateOfResign: {
      type: Date,
    },
    workDescription: {
      type: String,
    },
    usedSkills: {
      type: Array,
    },
  },

  contactInfo: {
    email: {
      type: String,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    phone: {
      type: String,
    },
    skypeId: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Employee", EmployeeSchema);
