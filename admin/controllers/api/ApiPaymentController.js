let router = require('express').Router();
let config = require('../../config/config');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let crypto = require("crypto");
let sendgridemail = require('../../lib/email');
let rn = require('random-number');
let notificationContent = require('../../lib/notificationContent');
var request = require('request');
const s3Upload = require('../../lib/s3Upload');

const Razorpay = require("razorpay");
const Payment = require.main.require("./models/Payment");

async function createOrder {
  try {
    const { plan_id, plan_name, amount, gateway, user_id } = req.body;

    if (gateway === "razorpay") {

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "rcpt_" + Date.now(),
      });

      await Payments.create({
        user_id,
        plan_id,
        plan_name,
        amount,
        gateway,
        order_id: order.id,
        status: "created",
      });

      data = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
      };
    } else if (gateway === "paytm") {
      data = { redirect_url: `https://sandbox.${gateway}.com/pay?plan=${plan_id}&amount=${amount}` };
    } else if (gateway === "paypal") {
      data = { redirect_url: `https://sandbox.${gateway}.com/pay?plan=${plan_id}&amount=${amount}` };
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

async function verifyPayment (req, res) {
  try {
    const { gateway, razorpay_order_id, razorpay_payment_id, razorpay_signature, plan_id, user_id } = req.body;

    if (gateway === "razorpay") {
      const payment = await Payments.findOne({ order_id: razorpay_order_id });
      if (!payment) res.status(404).json({ success: false, message: "Invalid order id" });

      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature === razorpay_signature) {
        // ✅ Save payment success
        payment.payment_id = razorpay_payment_id;
        payment.status = "success";
        payment.response = req.body;
        await payment.save();

        console.log(`✅ Payment verified for ${user_id}, plan: ${plan_id}`);
        res.json({ success: true, message: "Payment verified successfully" });
      }
      res.status(400).json({ success: false, message: "Invalid signature" });
    }

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };