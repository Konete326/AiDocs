const Feedback = require('../models/Feedback');
const notificationService = require('../services/notificationService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createFeedback = catchAsync(async (req, res, next) => {
  const { content, rating = 5 } = req.body;

  if (!content) {
    return next(new AppError('Please provide feedback content', 400));
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar,
    role: req.user.role || 'Community Member',
    content,
    rating
  });

  // Create notification for the user
  await notificationService.createNotification(
    req.user._id,
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

exports.getAllFeedback = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.find()
    .sort({ createdAt: -1 })
    .limit(100);

  res.status(200).json({
    success: true,
    results: feedback.length,
    data: feedback
  });
});
