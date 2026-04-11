const express = require('express');
const { sendMessage } = require('../controllers/chatController');
const authenticate = require('../middleware/authenticate');
const { checkSubscription } = require('../middleware/checkSubscription');

const router = express.Router();

router.post(
  '/projects/:projectId/chat',
  authenticate,
  checkSubscription(['pro', 'team']),
  sendMessage
);

module.exports = router;
