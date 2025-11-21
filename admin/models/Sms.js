const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema({
  mobile_no: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  date_created: {
    type: String, 
    default: () => new Date().toISOString().replace("T", " ").substring(0, 19),
  },

  token: {
    type: String,
    default: "",
  },

  token_status: {
    type: String,
    enum: ["Active", "Expire"],
    default: "Active",
  },

  token_verified: {
    type: String,
    default: "", 
  },

  token_expired: {
    type: String,
    default: "", 
  },
});

module.exports = mongoose.model("Sms", smsSchema);
