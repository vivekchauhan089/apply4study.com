// models/Progress.js
const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 }, // % completed (e.g., 30%)
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CourseProgress", ProgressSchema);
