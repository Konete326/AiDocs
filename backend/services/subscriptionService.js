const Subscription = require('../models/Subscription');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');

exports.getUserSubscription = async (userId) => {
  let subscription = await Subscription.findOne({ userId });
  if (!subscription) {
    subscription = await Subscription.create({
      userId,
      plan: 'free',
      status: 'active',
      projectLimit: 999999
    });
  }
  return subscription;
};

exports.checkProjectLimit = async (userId) => {
  return;
};

exports.canExport = async (userId) => {
  return true;
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
