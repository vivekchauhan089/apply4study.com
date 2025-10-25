const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, required: true, index: true },
    category: { type: String, required: true },
    tags: [{ type: String }],

    author: {
      name: { type: String, required: true },
      role: { type: String },
      bio: { type: String },
      avatar: { type: String }
    },

    publishDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    summary: { type: String },
    heroImage: { type: String },
    images: [{ type: String }],
    contentExcerpt: { type: String },
    content: { type: String },

    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      canonical: { type: String },
      ogImage: { type: String },
      keywords: [{ type: String }]
    },

    readingTime: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    relatedSlugs: [{ type: String }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blogs", BlogSchema);

