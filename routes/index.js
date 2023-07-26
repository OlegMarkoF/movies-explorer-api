const router = require('express').Router();
const { UserNotFound } = require('../utils/NotFoundError');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('/*', (req, res, next) => {
  next(new UserNotFound());
});

module.exports = router;
