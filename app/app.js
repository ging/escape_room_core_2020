/************************************ NO TOCAR *****************************************/
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
const session = require("express-session"),
  SequelizeStore = require("connect-session-sequelize")(session.Store);
const favicon = require('serve-favicon');
const methodOverride = require("method-override");
const flash = require("express-flash");
const indexRouter = require('./routes/index');
const partials = require('express-partials');
const escappMW = require('./helpers/escapp');

const app = express();
app.use(partials());
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));
app.use(cookieParser());


const sequelize = require("./model");
const sessionStore = new SequelizeStore({"db": sequelize,
  "table": "Session",
  "checkExpirationInterval": 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds. (15 minutes)
  "expiration": 4 * 60 * 60 * 1000});// The maximum age (in milliseconds) of a valid session. (4 hours)

app.use(session({"secret": "CSIC",
  "store": sessionStore,
  "resave": false,
  "saveUninitialized": true}));

app.use(methodOverride("_method", {"methods": [
  "POST",
  "GET"
]}));


app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
})

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(escappMW);




app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/***************************************************************************************/
