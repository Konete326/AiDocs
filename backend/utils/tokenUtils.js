const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'clarifyai_jwt_access_secret_fallback_key_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'clarifyai_jwt_refresh_secret_fallback_key_2026';

exports.generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m'
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d'
  });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

exports.hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
