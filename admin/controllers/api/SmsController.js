const request = require("request");
const Sms = require("../models/Sms");
const DeviceInfo = require("../models/DeviceInfo");
const crypto = require("crypto");

// ➤ SMS Gateway URL
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
// ✔ SEND SMS OTP  (Device ID Supported)
// ==================================================================
async function sendSmsOtp(req, res) {
  try {
    const { mobile, device_id } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required",
      });
    }

    // 🔹 Validate device_id
    if (!device_id) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required",
      });
    }

    // 🔹 Auto-create or find existing device
    let device = await DeviceInfo.findOne({ device_id });

    if (!device) {
      device = await DeviceInfo.create({
        device_id,
        mobile,
        status: "Active",
      });
    } else {
      // update last active
      device.last_active = new Date();
      device.mobile = mobile;
      await device.save();
    }

    // Auto expire OTPs older than 10 min
    await autoExpireOldOtps(mobile);

    const otp = generateOtp();
    const token = generateToken();

    // Expire old active tokens
    await Sms.updateMany(
      { mobile, token_status: "Active" },
      {
        $set: {
          token_status: "Expire",
          token_expired: formatDate(),
        },
      }
    );

    // Create new SMS record (with device JOIN)
    const smsRecord = await Sms.create({
      mobile,
      otp,
      token,
      date_created: formatDate(),
      token_status: "Active",
      device_id: device._id, // ⭐ store ObjectId
    });

    // Send SMS
    request.post(
      {
        url: SMS_GATEWAY_URL,
        json: {
          to: `+91${mobile}`,
          message: `Your OTP is ${otp}.`,
        },
      },
      (error, response, body) => {
        console.log("SMS API Result:", body);
      }
    );

    return res.json({
      success: true,
      message: "OTP sent successfully",
      token: token,
    });
  } catch (error) {
    console.error("SMS OTP Send Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
}

// ==================================================================
// ✔ VERIFY OTP
// ==================================================================
async function verifySmsOtp(req, res) {
  try {
    const { mobile, otp, token } = req.body;

    if (!mobile || !otp || !token) {
      return res.status(400).json({
        success: false,
        message: "Mobile, OTP & Token required",
      });
    }

    const record = await Sms.findOne({
      mobile,
      otp,
      token,
      token_status: "Active",
    }).populate("device_id"); // ⭐ join device info

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or token",
      });
    }

    // Mark OTP used
    record.token_status = "Expire";
    record.token_verified = formatDate();
    record.token_expired = formatDate();
    await record.save();

    return res.json({
      success: true,
      message: "OTP verified successfully",
      device_info: record.device_id, // ⭐ return device info
    });
  } catch (error) {
    console.error("SMS OTP Verify Error:", error);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
}

// ==================================================================
// ✔ AUTO EXPIRE OLD OTPs (10 minutes)
// ==================================================================
async function autoExpireOldOtps(mobile) {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  await Sms.updateMany(
    {
      mobile,
      token_status: "Active",
      date_created: { $lt: tenMinutesAgo },
    },
    {
      $set: {
        token_status: "Expire",
        token_expired: new Date(),
      },
    }
  );
}

module.exports = { sendSmsOtp, verifySmsOtp };
