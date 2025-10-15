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

const Plan = require.main.require("./models/Plan");

// GET /api/plans
async function getAllPlans (req, res) {
  try {
    const plans = await Plan.find({ is_active: true }).sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ success: false, message: "Failed to load plans" });
  }
};

// POST /api/plans (optional for admin setup)
async function createPlan (req, res) {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllPlans, createPlan };