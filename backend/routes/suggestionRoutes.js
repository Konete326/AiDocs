const express = require('express');
const { getSuggestions } = require('../controllers/suggestionController');
const authenticate = require('../middleware/authenticate');
const apiLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/suggestions', apiLimiter, authenticate, getSuggestions);

module.exports = router;
