const notificationService = require('../services/notificationService');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getNotifications = asyncWrapper(async (req, res) => {
  const { unread } = req.query;
  const notifications = await notificationService.getUserNotifications(req.user.id, unread === 'true');
  res.status(200).json({ success: true, data: notifications });
});

exports.markAsRead = asyncWrapper(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: notification });
});

exports.markAllAsRead = asyncWrapper(async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);
  res.status(200).json({ success: true, data: {} });
});

exports.deleteNotification = asyncWrapper(async (req, res) => {
  await notificationService.deleteNotification(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: null });
});
