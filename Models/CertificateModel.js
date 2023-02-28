const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  issuingOrganisation: {
    type: String,
  },
  certificateLink: {
    type: String,
  },
  issuDate: {
    type: Date,
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
module.exports = mongoose.model("Certificate", CertificateSchema);
