const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

require('./app/config/logging');

const app = express();

app.get('*.js', function(req, res, next) {
  const gzUrl = req.url + '.gz';
  if (!fs.existsSync(path.join(__dirname, 'public', gzUrl))) {
    return next();
  }
  req.url = gzUrl;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', function(req, res, next) {
  const gzUrl = req.url + '.gz';
  if (!fs.existsSync(path.join(__dirname, 'public', gzUrl))) {
    return next();
  }
  req.url = gzUrl;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

// app.use(compression());

const { baseUrl } = require('./app/config/config');
global.db = require('./app/models/index');
global.baseUrl = baseUrl;

const routes = require('./app/routes');
const helper = require('./app/helpers');

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token,authorization');
  res.header('Access-Control-Allow-Credentials', true);
  // eslint-disable-next-line
  if ('OPTIONS' === req.method) {
    res.status(204).end();
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
