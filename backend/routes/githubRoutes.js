const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const githubController = require('../controllers/githubController');

router.get('/connect', authenticate, githubController.getConnectUrl);
router.get('/callback', githubController.handleCallback);
router.get('/status', authenticate, githubController.getStatus);
router.post('/save-token', authenticate, githubController.saveTokenDirect);
router.post('/disconnect', authenticate, githubController.disconnect);
router.post('/push-suite', authenticate, githubController.pushProjectSuite);

module.exports = router;
