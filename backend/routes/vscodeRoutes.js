const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createWorkspace, destroyWorkspace } = require('../controllers/vscodeController');

router.post('/workspace/:id', authenticate, createWorkspace);
router.delete('/workspace/:id', authenticate, destroyWorkspace);

module.exports = router;
