const asyncWrapper = require('../utils/asyncWrapper');

const checkSubscription = (allowedPlans) => asyncWrapper(async (req, res, next) => {
  next();
});

const requirePlan = (plans) => {
  return async (req, res, next) => {
    next();
  };
};

module.exports = { checkSubscription, requirePlan };

