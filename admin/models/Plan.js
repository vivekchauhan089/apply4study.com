const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  plan_id: { type: String, required: true, unique: true }, // e.g., plan_free
  name: { type: String, required: true },                  // e.g., Free Plan
  description: String,
  price: { type: Number, required: true },                 // e.g., 499
  currency: { type: String, default: "INR" },
  is_active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Plans", PlanSchema);
