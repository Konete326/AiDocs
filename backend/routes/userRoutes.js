const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const { uploadAvatar } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/me', userController.getMe);
router.patch('/me', userController.updateMe);
router.patch('/me/avatar', uploadAvatar, userController.uploadAvatar);

module.exports = router;
