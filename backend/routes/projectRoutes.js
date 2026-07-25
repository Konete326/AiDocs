const express = require('express');
const projectController = require('../controllers/projectController');
const authenticate = require('../middleware/authenticate');
const validateRequest = require('../middleware/validateRequest');
const { createProjectSchema, updateProjectSchema } = require('../utils/validations');

const router = express.Router();

router.use(authenticate);

router.get('/', projectController.getAllProjects);
router.post('/', validateRequest(createProjectSchema), projectController.createProject);
router.get('/:id', projectController.getProject);
router.get('/:id/events', projectController.streamEvents);
router.patch('/:id', validateRequest(updateProjectSchema), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/generate', projectController.triggerGeneration);
router.post('/:id/reset-status', projectController.resetStatus);

module.exports = router;
