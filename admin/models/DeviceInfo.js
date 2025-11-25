const mongoose = require("mongoose");

const deviceInfoSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
    unique: true,   // one device, one record
  },

  device_token: {
    type: String,
    default: "",
  },

  mobile: {
    type: String,
    default: "",
  },

  os: {
    type: String,
    enum: ["android", "ios", "web"],
    default: "android",
  },

  os_version: {
    type: String,
    default: "",
  },

  app_version: {
    type: String,
    default: "",
  },

  manufacturer: {
    type: String,
    default: "",
  },

  model: {
    type: String,
    default: "",
  },

  install_time: {
    type: Date,
    default: Date.now,
  },

  last_active: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

module.exports = mongoose.model("DeviceInfo", deviceInfoSchema);
