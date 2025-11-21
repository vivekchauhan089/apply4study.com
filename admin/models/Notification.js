const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },

  title: String,
  message: String,
  type: { type: String, default: "general" },
  image: String,

  is_read: { type: Boolean, default: false },

  created_at: { type: Date, default: Date.now },
  read_at: { type: Date, default: null }
});

module.exports = mongoose.model("notifications", NotificationSchema);
