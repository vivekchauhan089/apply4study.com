let router = require('express').Router();
let config = require('../../config/config');
var request = require('request');
const Pages = require.main.require("./models/Pages");
const Menus = require.main.require("./models/Menus");

// ✅ GET /api/menus
/**
 * ✅ Fetch all menus that have an existing published page
 */
async function getAllMenus(req, res) {
  try {
    const menus = await Menus.aggregate([
      {
        $match: {
          status: { $in: ["published"] },
        },
      },
      {
        $lookup: {
          from: "pages",          // ✅ reference to pages collection
          localField: "slug",     // match menu.slug
          foreignField: "slug",   // with page.slug
          as: "pageData",
        },
      },
      {
        $match: {
          "pageData.0": { $exists: true },                // ensure a matching page exists
          "pageData.status": "published",                 // ensure the page is published
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          content: 1,
          image: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          page: { $arrayElemAt: ["$pageData", 0] }, // include first matched page
        },
      },
    ]);

    if (!menus.length) {
      return res.status(200).json({ success: true, message: "No published menus with pages found", data: [] });
    }

    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.error("❌ Error fetching menus:", error);
    res.status(500).json({ success: false, message: "Failed to load menus with published pages" });
  }
}

// ✅ POST /api/menus
async function createMenu(req, res) {
  try {
    const menu = new Menus(req.body);
    await menu.save();
    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = { getAllMenus, createMenu };
