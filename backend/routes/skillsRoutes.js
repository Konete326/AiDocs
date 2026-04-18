const express = require('express');
const { getProjectSkills, toggleProjectSkill, getAllAvailableSkills, getAllSkills } = require('../controllers/skillsController');
const authenticate = require('../middleware/authenticate');
const asyncWrapper = require('../utils/asyncWrapper');

const router = express.Router();

router.get('/', authenticate, asyncWrapper(async (req, res) => {
  const skills = await getAllSkills();
  res.json({ success: true, data: skills });
}));

router.get('/available', authenticate, asyncWrapper(async (req, res) => {
  const skills = await getAllAvailableSkills();
  res.json({ success: true, data: skills });
}));

router.get('/:projectId/skills', authenticate, getProjectSkills);
router.post('/:projectId/toggle', authenticate, toggleProjectSkill);

module.exports = router;
