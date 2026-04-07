const AppError = require('../utils/AppError');
const Subscription = require('../models/Subscription');

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

module.exports = { requirePlan };
