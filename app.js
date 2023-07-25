require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errors');

const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { validateUser, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./utils/NotFoundError');
const { MONGO_CONNECT_URL, PORT, LIMITER } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(LIMITER);

app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use('/users', auth, userRoute);
app.use('/movies', auth, movieRoute);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
