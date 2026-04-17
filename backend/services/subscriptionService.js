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
  const sub = await Subscription.findOne({ userId });
  if (!sub) return;
  const projectCount = await Project.countDocuments({ userId, isArchived: false });
  if (projectCount >= sub.projectLimit) {
    throw new AppError(`You've reached the project limit for your ${sub.plan} plan. Please upgrade to create more projects.`, 403, 'LIMIT_REACHED');
  }
};

exports.canExport = async (userId) => {
  const sub = await Subscription.findOne({ userId });
  if (!sub) return false;
  return sub.plan === 'pro' || sub.plan === 'team';
};

const PLAN_LIMITS = {
  free: 3,
  pro: 10,
  team: 999999,
};

exports.upgradePlan = async (userId, stripeData) => {
  return await Subscription.findOneAndUpdate(
    { userId },
    {
      plan: stripeData.plan,
      status: stripeData.status || 'active',
      stripeCustomerId: stripeData.stripeCustomerId,
      stripeSubscriptionId: stripeData.stripeSubscriptionId,
      currentPeriodStart: stripeData.currentPeriodStart,
      currentPeriodEnd: stripeData.currentPeriodEnd,
      projectLimit: PLAN_LIMITS[stripeData.plan] || 3,
    },
    { upsert: true, new: true }
  );
};

exports.downgradeByStripeId = async (stripeSubscriptionId) => {
  return await Subscription.findOneAndUpdate(
    { stripeSubscriptionId },
    { plan: 'free', status: 'canceled', projectLimit: 3 },
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
