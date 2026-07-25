const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Public route to get all feedback
router.get('/', feedbackController.getAllFeedback);

// Protected route to submit feedback
router.post('/', authenticate, feedbackController.createFeedback);

module.exports = router;
