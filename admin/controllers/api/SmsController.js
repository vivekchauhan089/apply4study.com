const request = require('request');
const Sms = require("../models/Sms");
const crypto = require("crypto");

// ➤ Replace with your local/third-party SMS Gateway URL
const SMS_GATEWAY_URL = "http://localhost:8080/sms/send";

// Generate 6 digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate unique token
function generateToken() {
  return crypto.randomBytes(24).toString("hex");
}

// Format date "YYYY-MM-DD HH:mm:SS"
function formatDate(date = new Date()) {
  return date.toISOString().replace("T", " ").substring(0, 19);
}

// ==================================================================
// ✔ SEND SMS OTP
// ==================================================================
async function sendSmsOtp(req, res) {
  try {
    const { mobile_no } = req.body;

    if (!mobile_no) {
      return res.status(400).json({ success: false, message: "Mobile number required" });
    }

    // Auto expire past OTPs older than 10 minutes
    await autoExpireOldOtps(mobile_no);

    const otp = generateOtp();
    const token = generateToken();

    // ❗ Expire old active tokens for same number
    await Sms.updateMany(
      { mobile_no, token_status: "Active" },
      {
        $set: {
          token_status: "Expire",
          token_expired: formatDate()
        }
      }
    );

    // Create new SMS OTP record
    const smsRecord = await Sms.create({
      mobile_no,
      otp,
      token,
      date_created: formatDate(),
      token_status: "Active",
    });

    // Send SMS through your SMS Gateway
    request.post({
      url: SMS_GATEWAY_URL,
      json: {
        to: `+91${mobile_no}`,
        message: `Your OTP is ${otp}.`
      }
    }, (error, response, body) => {
      console.log("SMS API Result:", body);
    });

    return res.json({
      success: true,
      message: "OTP sent successfully",
      token: token, // return token for app verification
    });

  } catch (error) {
    console.error("SMS OTP Send Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
}

// ==================================================================
// ✔ VERIFY OTP
// ==================================================================
async function verifySmsOtp(req, res) {
  try {
    const { mobile_no, otp, token } = req.body;

    if (!mobile_no || !otp || !token) {
      return res.status(400).json({ success: false, message: "Mobile, OTP & Token required" });
    }

    const record = await Sms.findOne({
      mobile_no,
      otp,
      token,
      token_status: "Active",
    });

    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid OTP or token" });
    }

    // OTP Verified → update status
    record.token_status = "Expire";
    record.token_verified = formatDate();
    record.token_expired = formatDate();
    await record.save();

    return res.json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("SMS OTP Verify Error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
}


// EXPIRE old OTPs older than 10 minutes
async function autoExpireOldOtps(mobile_no) {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  await Sms.updateMany(
    {
      mobile_no,
      token_status: "Active",
      date_created: { $lt: tenMinutesAgo }
    },
    {
      $set: {
        token_status: "Expire",
        token_expired: new Date()
      }
    }
  );
}

module.exports = { sendSmsOtp, verifySmsOtp };
