const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  image: { type: String },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Menus", MenuSchema);
