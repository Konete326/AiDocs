const express = require('express');
const documentController = require('../controllers/documentController');
const authenticate = require('../middleware/authenticate');
const { requirePlan } = require('../middleware/checkSubscription');

const router = express.Router({ mergeParams: true });

router.use(authenticate);

router.get('/', documentController.getProjectDocuments);
router.get('/:type', documentController.getSingleDocument);
router.patch('/:type', requirePlan(['pro', 'team']), documentController.updateDocument);

module.exports = router;
