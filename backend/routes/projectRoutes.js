const express = require('express');
const projectController = require('../controllers/projectController');
const annotationController = require('../controllers/annotationController');
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
router.post('/:id/annotations', annotationController.submitAnnotations);
router.get('/:id/annotations/pending', annotationController.getPendingAnnotations);
router.patch('/:id/annotations/:annId', annotationController.updateAnnotationStatus);
router.post('/:id/annotations/:annId/thread', annotationController.addThreadMessage);

module.exports = router;
