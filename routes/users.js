const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validation');
const { updateUser, getMe } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
