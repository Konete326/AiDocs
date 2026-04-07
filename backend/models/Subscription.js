const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    plan: { type: String, enum: ['free', 'pro', 'team'], default: 'free' },
    status: { type: String, enum: ['active', 'canceled', 'past_due', 'trialing'], default: 'active' },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    projectLimit: { type: Number, default: 1 }
  },
  { timestamps: false }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
