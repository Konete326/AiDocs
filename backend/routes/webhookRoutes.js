const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const webhookController = require('../controllers/webhookController');

router.post('/github', express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}), webhookController.handleGithubWebhook);

router.post('/sync/:projectId', authenticate, webhookController.triggerManualSync);

module.exports = router;
