const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const subscriptionService = require('./subscriptionService');

exports.createNotification = async (userId, type, title, message, metadata = {}) => {
  return await Notification.create({
    userId,
    type,
    title,
    message,
    metadata
  });
};

exports.ensureBillingNotification = async (userId) => {
  try {
    const hasBillingNotif = await Notification.exists({
      userId,
      $or: [
        { type: { $in: ['plan_upgraded', 'billing', 'plan'] } },
        { title: { $regex: /Plan|Billing|Subscription/i } }
      ]
    });

    if (!hasBillingNotif) {
      const subscription = await subscriptionService.getUserSubscription(userId);
      const isPro = ['pro', 'team'].includes(subscription?.plan);
      await Notification.create({
        userId,
        type: isPro ? 'plan_upgraded' : 'billing',
        title: isPro ? 'Subscription Active: Pro Plan' : 'Plan Alert: Free Plan Active',
        message: isPro
          ? 'Your Pro Plan subscription is active with unlimited project generation and exports.'
          : 'You are currently on the Free Plan. Upgrade to Pro for unlimited project generation and ZIP exports.',
        metadata: { plan: subscription?.plan || 'free' }
      });
    }
  } catch (err) {}
};

exports.getUserNotifications = async (userId, unreadOnly = false) => {
  await exports.ensureBillingNotification(userId);

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

exports.deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findOneAndDelete({ _id: notificationId, userId });
  if (!notification) throw new AppError('Notification not found', 404, 'NOT_FOUND');
  return notification;
};
