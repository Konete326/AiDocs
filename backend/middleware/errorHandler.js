const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = Object.values(err.errors).map(val => val.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = 400;
    code = 'DUPLICATE_KEY_ERROR';
    message = 'Duplicate field value entered';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID_ERROR';
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === 'MongoNetworkError' || err.name === 'MongoServerSelectionError' || (err.message && (err.message.includes('timed out') || err.message.includes('Socket') || err.message.includes('connectTimeoutMS') || err.message.includes('buffering')))) {
    statusCode = 503;
    code = 'DATABASE_CONNECTION_ERROR';
    message = 'Database connection temporarily delayed. Please try again in a moment.';
  } else if (err.message && (err.message.includes('secret') || err.message.includes('jwt'))) {
    statusCode = 500;
    code = 'CONFIG_ERROR';
    message = 'Server configuration error. Contact support.';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    code = 'INVALID_TOKEN';
    message = 'Invalid token. Please log in again.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    code = 'TOKEN_EXPIRED';
    message = 'Your token has expired. Please log in again.';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    code: code
  });
};

module.exports = errorHandler;
