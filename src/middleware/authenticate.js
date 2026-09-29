const jwt = require('jsonwebtoken');
const { loadConfig } = require('../config');
const { AppError } = require('../errors');

function authenticate(req, res, next) {
  const authorization = req.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AppError(401, 'Authentication required'));
  }

  const token = authorization.slice('Bearer '.length);
  if (!token) {
    return next(new AppError(401, 'Authentication required'));
  }

  try {
    const { sub } = jwt.verify(token, loadConfig().jwtSecret);
    if (typeof sub !== 'string') {
      throw new Error('Invalid subject');
    }
    req.user = { id: sub };
    return next();
  } catch (error) {
    return next(new AppError(401, 'Invalid or expired token'));
  }
}

module.exports = authenticate;
