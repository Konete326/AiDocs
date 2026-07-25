const firebaseAuth = require('../config/firebase');
const AppError = require('../utils/AppError');
const asyncWrapper = require('../utils/asyncWrapper');

module.exports = asyncWrapper(async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) throw new AppError('Firebase ID token is required', 401, 'NO_TOKEN');

  const decoded = await firebaseAuth.verifyIdToken(idToken);

  req.firebaseUser = {
    uid: decoded.uid,
    email: decoded.email,
    name: decoded.name || decoded.email.split('@')[0],
    picture: decoded.picture || null
  };

  next();
});
