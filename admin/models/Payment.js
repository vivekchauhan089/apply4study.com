const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "Plans" },
  plan_name: String,
  amount: Number,
  currency: { type: String, default: "INR" },
  gateway: String,
  order_id: String,
  payment_id: String,
  status: { type: String, default: "pending" },
  response: Object,
}, { timestamps: true });

module.exports = mongoose.model("Payments", PaymentSchema);
