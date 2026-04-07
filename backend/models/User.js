const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: function() { return !this.firebaseUid; } },
    firebaseUid: { type: String, sparse: true, index: true },
    displayName: { type: String, minlength: 2, maxlength: 80, required: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    refreshTokenHash: { type: String },
    refreshTokenExpiry: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
