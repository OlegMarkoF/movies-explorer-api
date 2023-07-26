const router = require('express').Router();
const { validateUser, validateLogin } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../utils/NotFoundError');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);
// router.get('/signout', logout);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
