const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');
const asyncWrapper = require('../utils/asyncWrapper');

const checkSubscription = (allowedPlans) => asyncWrapper(async (req, res, next) => {
  const sub = await Subscription.findOne({ userId: req.user.id });
  if (!sub || !allowedPlans.includes(sub.plan)) {
    throw new AppError('This feature requires a Pro or Team plan', 403, 'PLAN_REQUIRED');
  }
  next();
});

const requirePlan = (plans) => {
  return async (req, res, next) => {
    try {
      const subscription = await Subscription.findOne({ userId: req.user.id });
      if (!subscription || !plans.includes(subscription.plan)) {
         throw new AppError('This action requires a higher subscription plan.', 403, 'UPGRADE_REQUIRED');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkSubscription, requirePlan };
