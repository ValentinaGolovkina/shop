var express = require('express');
var path = require('path');
var HttpError = require('error').HttpError;
var favicon = require('serve-favicon');
//var logger = require('morgan');
var log = require('libs/log')(module);
var config = require('./config');
var mongoose = require('libs/mongoose');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(require('middleware/loadUser'));
require('./routes')(app);
/*
app.use(function(req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.send("Visits: " + req.session.numberOfVisits);
});*/

/*app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});*/

/*app.use(require('./middleware/sendHttpError'));
//Обработка ошибок
app.use(function(err, req, res, next) {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  //  res.sendHttpError(new HttpError(404,"bhjjj"));
  } else {
    if (app.get('env') == 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        })});
  } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

var http = require('http');
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err|| 500);
  res.render('error', {
    message: err.message|| http.STATUS_CODES[err],
    error: err
  });
});

module.exports = app;