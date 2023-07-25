const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/errors');

const { JWT_SECRET } = require('../utils/config');

const handleError = (req, res, next) => {
  next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleError(res, req, next);
  }

  let payload;

  try {
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(res, req, next);
  }

  req.user = payload;

  return next();
};

module.exports = auth;
