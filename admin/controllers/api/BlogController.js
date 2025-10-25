const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const rn = require('random-number');
const request = require('request');
const sendgridemail = require('../../lib/email');
const s3Upload = require('../../lib/s3Upload');
const notificationContent = require('../../lib/notificationContent');

const Blog = require.main.require("./models/Blogs");

/**
 * GET /api/blogs
 * Fetch all published blogs (with optional category or tag filters)
 */
async function getAllBlogs(req, res) {
  try {
    const { category, tag, featured } = req.query;

    const filter = { status: "published" };
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (featured) filter.featured = featured === "true";

    const blogs = await Blog.find(filter)
      .sort({ publishDate: -1 })
      .select("-__v");

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to load blogs" });
  }
}

/**
 * GET /api/blogs/:slug
 * Fetch single blog details by slug
 */
async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: "published" });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    res.status(500).json({ success: false, message: "Error retrieving blog" });
  }
}

module.exports = {
  getAllBlogs,
  getBlogBySlug
};
