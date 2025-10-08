const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  session_id: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
