// models/Survey.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Question text
  type: { 
    type: String, 
    enum: ["text", "textarea", "radio", "checkbox", "dropdown", "rating"], 
    required: true 
  },
  options: [String], // For MCQ/checkbox/dropdown
  required: { type: Boolean, default: false }
});

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["assessment", "survey"], default: "assessment" },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  questions: [QuestionSchema],
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Survey", SurveySchema);
