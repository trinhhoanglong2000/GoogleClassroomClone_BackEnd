const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config()
passport = require('./authentication/index')

const indexRouter = require('./routes/index');
const classesRouter = require('./api/classes');
const mailRouter = require('./api/mail');
const loginRouter = require('./api/Login');
const registerRouter = require('./api/Register');
const classesaccountRouter = require('./api/classesaccount');
const accountRouter = require('./api/Account');

const app = express();
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/classes', classesRouter);
app.use('/mail', mailRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/classesaccount',classesaccountRouter);
app.use('/Account',accountRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
