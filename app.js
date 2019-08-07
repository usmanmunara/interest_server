const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoute = require('./src/User');
const InterestRoute = require('./src/Interests');
const PaymentRoute = require('./src/Payment');

const DemoRoute = require('./src/Interests/demo');

require('./src/dbBackup');
// const helmet = require('helmet');

const path = require('path');
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.disable('x-powered-by');

if (app.get('env') != 'development') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

if (app.get('env') === 'development') {
  app.use('/api', cors(corsOptions));
}

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/interests', InterestRoute);
app.use('/api/v1/interests', DemoRoute);
app.use('/api/v1/payment', PaymentRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
