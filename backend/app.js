const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');

const app = express();

app.use(helmet());

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use(cookieParser());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .pattern(new RegExp(/(https|http)?:\/\/.*/i)),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8),
  }),
}), login);

app.use(auth);

app.use('/', usersRoute, cardsRoute);

app.use('*', () => {
  throw new NotFoundError('Страница не найдена.');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://melkornwah.nomoredomains.icu/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 400).json({ message: err.message });

  next();
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App is running...');
});
