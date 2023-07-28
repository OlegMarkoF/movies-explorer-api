require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const index = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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

app.use('/', index);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
