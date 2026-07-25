const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/me', authenticate, subscriptionController.getMySubscription);
router.post('/checkout', authenticate, subscriptionController.createCheckout);

module.exports = router;
