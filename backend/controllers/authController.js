const authService = require('../services/authService');
const asyncWrapper = require('../utils/asyncWrapper');

const setRefreshCookie = (res, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // Always true for cross-site cookies
    sameSite: isProd ? 'none' : 'lax', // 'none' is required for cross-domain on Vercel
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
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

  res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
  res.status(200).json({ success: true, data: null });
});

exports.googleFirebaseAuth = asyncWrapper(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.handleFirebaseGoogleUser(req.firebaseUser);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ success: true, data: { user: { id: user._id, email: user.email, displayName: user.displayName, avatarUrl: user.avatarUrl }, accessToken } });
});
