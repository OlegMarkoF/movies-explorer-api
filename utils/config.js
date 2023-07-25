const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;
const MONGO_CONNECT_URL = process.MONGO_CONNECT_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'oleg-secrets-virtual-machine';

const VALIDATION_REG_EXP_FOR_URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  PORT, MONGO_CONNECT_URL, JWT_SECRET, LIMITER, VALIDATION_REG_EXP_FOR_URL,
};
