const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const { uploadAvatar, uploadBg } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/profile/:id', userController.getUserPublicProfile);
router.get('/social/:id', userController.getUserSocialNetwork);
router.get('/leaderboard', userController.getLeaderboard);

router.use(authenticate);

router.get('/me', userController.getMe);
router.get('/me/stats', userController.getMyStats);
router.patch('/me', userController.updateMe);
router.patch('/me/avatar', uploadAvatar, userController.uploadAvatar);
router.patch('/me/background', uploadBg, userController.uploadBgImage);
router.post('/:id/follow', userController.toggleFollowUser);

module.exports = router;
