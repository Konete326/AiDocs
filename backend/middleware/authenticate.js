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

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401, 'USER_DELETED'));
    }

    req.user = { id: currentUser._id, role: currentUser.role, email: currentUser.email };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
