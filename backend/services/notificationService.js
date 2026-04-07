const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');

exports.createNotification = async (userId, type, title, message, metadata = {}) => {
  return await Notification.create({
    userId,
    type,
    title,
    message,
    metadata
  });
};

exports.getUserNotifications = async (userId, unreadOnly = false) => {
  const query = { userId };
  if (unreadOnly) query.isRead = false;
  
  return await Notification.find(query).sort({ createdAt: -1 }).limit(50);
};

exports.markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new AppError('Notification not found', 404, 'NOT_FOUND');
  return notification;
};

exports.markAllAsRead = async (userId) => {
  await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );
};
