const AppError = require('../utils/AppError');
const { verifyAccessToken } = require('../utils/tokenUtils');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('You are not logged in. Please log in to get access.', 401, 'NOT_LOGGED_IN'));
    }

    const decoded = verifyAccessToken(token);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
