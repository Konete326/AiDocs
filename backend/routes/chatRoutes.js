const express = require('express');
const { sendMessage, getHistory, deleteHistory } = require('../controllers/chatController');
const authenticate = require('../middleware/authenticate');
const { checkSubscription } = require('../middleware/checkSubscription');

const router = express.Router();

router.get(
  '/projects/:projectId/chat',
  authenticate,
  checkSubscription(['pro', 'team']),
  getHistory
);

router.post(
  '/projects/:projectId/chat',
  authenticate,
  checkSubscription(['pro', 'team']),
  sendMessage
);

router.delete(
  '/projects/:projectId/chat',
  authenticate,
  checkSubscription(['pro', 'team']),
  deleteHistory
);

module.exports = router;
