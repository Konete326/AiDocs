const express = require('express');
const { getSuggestions } = require('../controllers/suggestionController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/suggestions', authenticate, getSuggestions);

module.exports = router;
