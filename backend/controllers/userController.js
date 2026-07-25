const User = require('../models/User');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');

exports.getMe = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash -refreshTokenHash');
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
  
  res.status(200).json({ success: true, data: user });
});

exports.updateMe = asyncWrapper(async (req, res) => {
  const allowedUpdates = ['displayName', 'avatarUrl'];
  const updates = {};
  
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400, 'BAD_REQUEST');
  }

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-passwordHash -refreshTokenHash');
  
  res.status(200).json({ success: true, data: user });
});

exports.uploadAvatar = asyncWrapper(async (req, res) => {
  if (!req.file) throw new AppError('Avatar file is required', 400, 'MISSING_FILE');

  const { uploadImage } = require('../services/cloudinaryService');
  
  const result = await uploadImage(req.file.buffer, 'aidocs/avatars', `user_${req.user.id}`);
  
  const user = await User.findByIdAndUpdate(
    req.user.id, 
    { avatarUrl: result.url }, 
    { new: true }
  ).select('-passwordHash -refreshTokenHash');
  
  res.status(200).json({ success: true, data: user });
});
