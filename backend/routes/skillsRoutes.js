const express = require('express');
const { getProjectSkills } = require('../controllers/skillsController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
router.get('/:projectId/skills', authenticate, getProjectSkills);

module.exports = router;
