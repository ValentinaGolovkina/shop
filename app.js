var express = require('express');
var path = require('path');
var HttpError = require('./error').HttpError;
var favicon = require('serve-favicon');
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
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));
require('./routes')(app);

/*var http = require('http');
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err|| 500);
  res.render('error', {
    message: err.message|| http.STATUS_CODES[err],
    error: err
  });
});*/

app.use(function(err, req, res, next) {
  if (typeof err == 'number') {
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      express.errorHandler()(err, req, res, next);
    } else {
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

module.exports = app;