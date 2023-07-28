const router = require('express').Router();
const {
  validateMovieId, validateMovie,
} = require('../middlewares/validation');
const {
  getMovie,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovie);
router.post('/', validateMovie, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
