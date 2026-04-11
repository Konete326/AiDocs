const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to get all feedback
router.get('/', feedbackController.getAllFeedback);

// Protected route to submit feedback
router.post('/', protect, feedbackController.createFeedback);

module.exports = router;
