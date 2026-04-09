const Subscription = require('../models/Subscription');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');

exports.getUserSubscription = async (userId) => {
  const subscription = await Subscription.findOne({ userId });
  if (!subscription) {
    throw new AppError('Subscription not found', 404, 'NOT_FOUND');
  }
  return subscription;
};

exports.checkProjectLimit = async (userId) => {
  const subscription = await Subscription.findOne({ userId });
  if (!subscription) {
    // If no subscription, create a default one to prevent crashes
    await Subscription.create({ userId, plan: 'free', status: 'active', projectLimit: 100 });
    return true;
  }
  
  const projectCount = await Project.countDocuments({ userId, isArchived: false });
  console.log(`User ${userId} has ${projectCount} projects. Limit is ${subscription.projectLimit}`);
  
  if (projectCount >= subscription.projectLimit) {
    throw new AppError('Project limit reached. Please upgrade your plan.', 403, 'LIMIT_REACHED');
  }
  return true;
};

exports.upgradePlan = async (userId, stripeData) => {
  return await Subscription.findOneAndUpdate(
    { userId },
    { ...stripeData },
    { new: true, upsert: true }
  );
};

exports.downgradeByStripeId = async (stripeSubscriptionId) => {
  return await Subscription.findOneAndUpdate(
    { stripeSubscriptionId },
    { plan: 'free', status: 'canceled', projectLimit: 1 },
    { new: true }
  );
};

exports.markPastDue = async (stripeSubscriptionId) => {
  return await Subscription.findOneAndUpdate(
    { stripeSubscriptionId },
    { status: 'past_due' },
    { new: true }
  );
};
