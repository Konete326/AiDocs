const User = require('../models/User');
const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');
const { generateAccessToken, generateRefreshToken, hashToken } = require('../utils/tokenUtils');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailUtils = require('../utils/emailService');
const notificationService = require('./notificationService');

exports.registerUser = async (email, password, displayName) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already in use', 400, 'USER_EXISTS');
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, passwordHash, displayName });

  await Subscription.create({ userId: user._id, plan: 'free', status: 'active', projectLimit: 3 });

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  return { user, accessToken, refreshToken };
};

exports.loginUser = async (email, password, deviceInfo = {}) => {
  const user = await User.findOne({ email });
  if (!user || user.passwordHash === undefined) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const { deviceFingerprint, deviceName } = deviceInfo;
  const isNewDevice = !user.knownDevices.includes(deviceFingerprint);

  if (isNewDevice && deviceFingerprint) {
    user.knownDevices.push(deviceFingerprint);
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  // Trigger Notifications (Silent fail on email to not block login)
  const notificationTitle = isNewDevice ? 'New Device Login' : 'Welcome Back';
  const notificationMessage = isNewDevice 
    ? `New login detected from ${deviceName || 'a new device'}. If this wasn't you, secure your account.`
    : `Hey ${user.displayName.split(' ')[0]}, you've successfully logged in.`;
  
  await notificationService.createNotification(user._id, 'security', notificationTitle, notificationMessage);
  
  emailUtils.sendSecurityAlertEmail(user.email, user.displayName, {
    isNewDevice,
    deviceName: deviceName || 'Unknown Device',
    time: new Date().toLocaleString()
  }).catch(err => console.error('Email alert failed:', err));

  return { user, accessToken, refreshToken };
};

exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new AppError('No refresh token provided', 401, 'NO_TOKEN');

  const hashedToken = hashToken(refreshToken);
  const user = await User.findOne({
    refreshTokenHash: hashedToken,
    refreshTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Invalid or expired refresh token', 401, 'INVALID_TOKEN');
  }

  const newAccessToken = generateAccessToken(user._id, user.role);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshTokenHash = hashToken(newRefreshToken);
  user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

exports.logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.refreshTokenHash = undefined;
  user.refreshTokenExpiry = undefined;
  await user.save();
};

exports.handleFirebaseGoogleUser = async (firebaseUser, deviceInfo = {}) => {
  let user = await User.findOne({ firebaseUid: firebaseUser.uid });

  if (!user) {
    user = await User.findOne({ email: firebaseUser.email.toLowerCase() });
  }

  if (!user) {
    user = await User.create({
      email: firebaseUser.email.toLowerCase(),
      firebaseUid: firebaseUser.uid,
      displayName: firebaseUser.name,
      avatarUrl: firebaseUser.picture || '',
      isVerified: true
    });
    await Subscription.create({ userId: user._id, plan: 'free', status: 'active', projectLimit: 3 });
  } else {
    const updates = {};
    if (!user.firebaseUid) updates.firebaseUid = firebaseUser.uid;
    if (!user.avatarUrl && firebaseUser.picture) updates.avatarUrl = firebaseUser.picture;
    
    if (Object.keys(updates).length > 0) {
      user = await User.findByIdAndUpdate(user._id, updates, { new: true });
    }
  }

  const { deviceFingerprint, deviceName } = deviceInfo;
  const isNewDevice = !user.knownDevices.includes(deviceFingerprint);

  if (isNewDevice && deviceFingerprint) {
    user.knownDevices.push(deviceFingerprint);
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await user.save();

  // Trigger Notifications
  const notificationTitle = isNewDevice ? 'New Device Login' : 'Welcome Back';
  const notificationMessage = isNewDevice 
    ? `Google login detected from ${deviceName || 'a new device'}.`
    : `Successfully logged in via Google. Welcome back!`;
  
  await notificationService.createNotification(user._id, 'security', notificationTitle, notificationMessage);
  
  emailUtils.sendSecurityAlertEmail(user.email, user.displayName, {
    isNewDevice,
    deviceName: deviceName || 'Unknown Device',
    time: new Date().toLocaleString()
  }).catch(err => console.error('Email alert failed:', err));

  return { user, accessToken, refreshToken };
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return;
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  await User.findByIdAndUpdate(user._id, {
    passwordResetToken: hashedToken,
    passwordResetExpiry: new Date(Date.now() + 60 * 60 * 1000),
  });
  await emailUtils.sendPasswordResetEmail(user.email, rawToken, user.displayName);
  return true;
};

exports.resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiry: { $gt: new Date() },
  });
  if (!user) throw new AppError('Invalid or expired reset token', 400, 'INVALID_TOKEN');
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await User.findByIdAndUpdate(user._id, {
    passwordHash, passwordResetToken: undefined,
    passwordResetExpiry: undefined, refreshTokenHash: undefined,
  });
  return true;
};
