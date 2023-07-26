const { celebrate, Joi } = require('celebrate');
const { VALIDATION_REG_EXP_FOR_URL } = require('../utils/config');

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(VALIDATION_REG_EXP_FOR_URL).required(),
    trailerLink: Joi.string().pattern(VALIDATION_REG_EXP_FOR_URL).required(),
    thumbnail: Joi.string().pattern(VALIDATION_REG_EXP_FOR_URL).required(),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().pattern(VALIDATION_REG_EXP_FOR_URL).required(),
    nameEN: Joi.string().pattern(VALIDATION_REG_EXP_FOR_URL).required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
