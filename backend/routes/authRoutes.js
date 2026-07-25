const express = require('express');
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const router = express.Router();

router.use(authLimiter);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

// Firebase Google Auth
router.post('/google', verifyFirebaseToken, authController.googleFirebaseAuth);

// Password Reset
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
