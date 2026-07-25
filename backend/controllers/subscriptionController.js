const stripeService = require('../services/stripeService');
const subscriptionService = require('../services/subscriptionService');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getMySubscription = asyncWrapper(async (req, res) => {
  const sub = await subscriptionService.getUserSubscription(req.user.id);
  res.status(200).json({ success: true, data: sub });
});

exports.createCheckout = asyncWrapper(async (req, res) => {
  const { plan } = req.body;
  const url = await stripeService.createCheckoutSession(req.user.id, req.user.email, plan);
  res.status(200).json({ success: true, data: { url } });
});

exports.handleWebhook = asyncWrapper(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  await stripeService.handleWebhookEvent(req.body, signature);
  res.status(200).send('Webhook successfully handled');
});
