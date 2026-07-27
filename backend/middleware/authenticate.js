const AppError = require('../utils/AppError');
const { verifyAccessToken, verifyRefreshToken } = require('../utils/tokenUtils');

const authenticate = async (req, res, next) => {
  try {
    let token;
    let decoded;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      decoded = verifyAccessToken(token);
    } else if (req.cookies && req.cookies.refreshToken) {
      token = req.cookies.refreshToken;
      decoded = verifyRefreshToken(token);
    } else if (req.query && req.query.token && req.query.token !== 'null' && req.query.token !== 'undefined') {
      token = req.query.token;
      try {
        decoded = verifyAccessToken(token);
      } catch {
        decoded = verifyRefreshToken(token);
      }
    }

    if (!token || !decoded) {
      return next(new AppError('You are not logged in. Please log in to get access.', 401, 'NOT_LOGGED_IN'));
    }

    req.user = { id: decoded.id, role: decoded.role || 'user' };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;

