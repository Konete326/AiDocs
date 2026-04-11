const Feedback = require('../models/Feedback');
const User = require('../models/User');
const notificationService = require('../services/notificationService');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');

exports.createFeedback = asyncWrapper(async (req, res, next) => {
  const { content, rating = 5 } = req.body;

  if (!content) {
    return next(new AppError('Please provide feedback content', 400));
  }

  // Fetch full user data since middleware only provides basic info
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const feedback = await Feedback.create({
    user: user._id,
    name: user.displayName || user.name || 'Anonymous',
    avatar: user.avatarUrl || user.avatar || '',
    role: user.role || 'Community Member',
    content,
    rating
  });

  // Create notification for the user
  await notificationService.createNotification(
    user._id,
    'system',
    'Feedback Received!',
    'Thank you for your valuable feedback! We appreciate your support in making AiDocs better.',
    { feedbackId: feedback._id }
  );

  res.status(201).json({
    success: true,
    data: feedback
  });
});

exports.getAllFeedback = asyncWrapper(async (req, res, next) => {
  const feedback = await Feedback.find()
    .sort({ createdAt: -1 })
    .limit(100);

  res.status(200).json({
    success: true,
    results: feedback.length,
    data: feedback
  });
});
