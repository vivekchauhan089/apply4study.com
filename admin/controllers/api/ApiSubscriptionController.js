let router = require('express').Router();
let config = require('../../config/config');
let APIBody = require('../../lib/APIBody');
let BodyCheck = require('../../lib/bodyCheck');
var request = require('request');

const Subscription = require.main.require('./models/Subscription');

// Subscribe (POST)
async function subscribe (req, res) {
  try {
    const { contact, type="updates" } = req.body;

    if (!contact) {
      res.status(400).json({ message: "Please enter your email or mobile number" });
      return;
    }

    // Check existing subscription
    const existing = await Subscription.findOne({ contact, type });
    if (existing) {
      res
        .status(409)
        .json({ message: "Already subscribed", subscription: existing });
      return;
    }

    const newSub = new Subscription({ contact, type });
    await newSub.save();

    res.status(201).json({
      message: "Subscribed successfully",
      subscription: newSub,
    });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
}

// Unsubscribe (DELETE)
async function unsubscribe (req, res) {
  try {
    const { contact } = req.params;
    const sub = await Subscription.findOne({ contact });

    if (!sub) {
      res.status(404).json({ message: "Subscription not found" });
      return;
    }

    await sub.deleteOne();
    res.json({ message: "Unsubscribed successfully" });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
}

module.exports = {subscribe, unsubscribe};