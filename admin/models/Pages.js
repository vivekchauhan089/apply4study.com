const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
    type: { type: String, required: true }, // "heading", "content", "image", "faq"
    content: { type: mongoose.Schema.Types.Mixed } // flexible for each block type
});

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    blocks: [BlockSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pages", PageSchema);
