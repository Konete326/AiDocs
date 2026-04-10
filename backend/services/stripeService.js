const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const subscriptionService = require('./subscriptionService');
const AppError = require('../utils/AppError');

exports.createCheckoutSession = async (userId, email, plan) => {
  let priceId;
  const limits = { free: 3, pro: 10, team: 999999 };

  if (plan === 'pro') priceId = process.env.STRIPE_PRO_PRICE_ID;
  else if (plan === 'team') priceId = process.env.STRIPE_TEAM_PRICE_ID;
  else throw new AppError('Invalid plan selected', 400, 'BAD_REQUEST');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      userId: userId.toString(),
      plan: plan,
      projectLimit: limits[plan].toString(),
    },
    success_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:5173/dashboard?upgrade=success',
    cancel_url: process.env.STRIPE_CANCEL_URL || 'http://localhost:5173/pricing',
  });

  return session.url;
};

exports.handleWebhookEvent = async (payload, signature) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    throw new AppError(`Webhook signature verification failed: ${err.message}`, 400, 'WEBHOOK_ERROR');
  }

  const session = event.data.object;

  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = session.metadata.userId;
      const plan = session.metadata.plan;
      const projectLimit = parseInt(session.metadata.projectLimit, 10);
      
      const subscriptionId = session.subscription;
      const customerId = session.customer;
      
      const subscriptionInfo = await stripe.subscriptions.retrieve(subscriptionId);
      
      const stripeData = {
        plan,
        status: 'active',
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        currentPeriodStart: new Date(subscriptionInfo.current_period_start * 1000),
        currentPeriodEnd: new Date(subscriptionInfo.current_period_end * 1000),
        projectLimit
      };
      
      await subscriptionService.upgradePlan(userId, stripeData);
      
      const notificationService = require('./notificationService');
      await notificationService.createNotification(
        userId,
        'plan_upgraded',
        'Plan Upgraded',
        `Welcome to the ${plan} plan!`
      );
      break;
    }
    case 'customer.subscription.deleted': {
      const subscriptionId = session.id;
      await subscriptionService.downgradeByStripeId(subscriptionId);
      break;
    }
    case 'invoice.payment_failed': {
      const subscriptionId = session.subscription;
      await subscriptionService.markPastDue(subscriptionId);
      break;
    }
  }

  return true;
};
