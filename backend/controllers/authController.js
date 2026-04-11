const authService = require('../services/authService');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');

const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    domain: isProd ? undefined : undefined,
  };
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    ...getCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

exports.register = asyncWrapper(async (req, res) => {
  const { email, password, displayName } = req.body;
  const { user, accessToken, refreshToken } = await authService.registerUser(email, password, displayName);

  setRefreshCookie(res, refreshToken);
  res.status(201).json({ success: true, data: { user: { id: user._id, email: user.email, displayName: user.displayName }, accessToken } });
});

exports.login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, data: { user: { id: user._id, email: user.email, displayName: user.displayName }, accessToken } });
});

exports.refreshToken = asyncWrapper(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken, refreshToken } = await authService.refreshAccessToken(token);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, data: { accessToken } });
});

exports.logout = asyncWrapper(async (req, res) => {
  let userId = null;
  if (req.user && req.user.id) userId = req.user.id;
  else if (req.cookies?.refreshToken) {
    const { hashToken } = require('../utils/tokenUtils');
    const User = require('../models/User');
    const user = await User.findOne({ refreshTokenHash: hashToken(req.cookies.refreshToken) });
    if (user) userId = user._id;
  }

  if (userId) await authService.logoutUser(userId);

  res.clearCookie('refreshToken', getCookieOptions());
  res.status(200).json({ success: true, data: null });
});

exports.googleFirebaseAuth = asyncWrapper(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.handleFirebaseGoogleUser(req.firebaseUser);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, data: { user: { id: user._id, email: user.email, displayName: user.displayName, avatarUrl: user.avatarUrl }, accessToken } });
});

exports.forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new AppError('Email required', 400, 'VALIDATION_ERROR');
  await authService.forgotPassword(email);
  res.json({ success: true, data: { message: 'If this email exists, a reset link has been sent.' } });
});

exports.resetPassword = asyncWrapper(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) throw new AppError('Token and password required', 400, 'VALIDATION_ERROR');
  if (password.length < 8) throw new AppError('Password too short', 400, 'VALIDATION_ERROR');
  await authService.resetPassword(token, password);
  res.json({ success: true, data: { message: 'Password reset successfully.' } });
});
