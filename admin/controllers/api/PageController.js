let router = require('express').Router();
const Pages = require.main.require("./models/Pages");
const Menus = require.main.require("./models/Menus");

// ✅ GET /api/pages — only those that exist in Menus (matched by slug)
async function getAllPages(req, res) {
  try {
    const pages = await Pages.aggregate([
      {
        $match: {
          status: { $in: ["published"] },
        },
      },
      {
        $lookup: {
          from: "menus",
          localField: "slug",
          foreignField: "slug",
          as: "menuData",
        },
      },
      {
        $match: { "menuData.0": { $exists: true } },
      },
      {
        $sort: { created_at: -1 },
      },
    ]);

    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ success: false, message: "Failed to load pages" });
  }
}

// ✅ Create new page
async function createPage(req, res) {
  try {
    const page = new Pages(req.body);
    await page.save();
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = { getAllPages, createPage };
