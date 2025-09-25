const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  type: { type: String, enum: ["classroom", "elearning"], required: true },
  courseDescription: { type: String }, // can store HTML / Quill / EditorJS JSON
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
  videos: [
    {
      url: { type: String }, // file path or embedded YouTube/Vimeo link
      type: { type: String, enum: ["upload", "embed"], default: "upload" },
      title: String
    }
  ],
  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], // assigned users
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);


/*db.courses.updateMany(
  {
    category: {
      $exists: true, 
      $type: "string",
      $regex: "^[0-9a-fA-F]{24}$",
      $ne: "", 
      $ne: null
    }
  },
  [
    { $set: { category: { $toObjectId: "$category" } } }
  ]
);

db.courses.find(
  { category: { $type: "string" } },
  { category: 1 }
);


*/
