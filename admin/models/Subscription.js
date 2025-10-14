const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    contact: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => {
          // Valid email or 10-digit mobile
          const emailRegex = /^\S+@\S+\.\S+$/;
          const mobileRegex = /^[0-9]{10}$/;
          return emailRegex.test(v) || mobileRegex.test(v);
        },
        message: "Contact must be a valid email or 10-digit mobile number.",
      },
    },
    type: {
      type: String,
      enum: ["newsletter", "updates", "promo", "contact"],
      default: "updates",
      required: true,
    },
    mobile: {
      type: String
    },
    subject: {
      type: String
    },
    content: {
      type: String
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
