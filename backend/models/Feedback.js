const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    role: {
      type: String,
      default: 'Community Member'
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
