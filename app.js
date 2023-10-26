var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var beltkrRouter = require('./routes/beltkr');
var weaponkrRouter = require('./routes/weaponkr');
var adminpageRouter = require('./routes/adminpage');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

var mongoose = require("mongoose");
var uri = "mongodb+srv://ennter69:12345thang@cluster0.anw1ycs.mongodb.net/product";
mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log("Connect to DB succeed !"))
  .catch((err) => console.log(err));

//khai báo và cấu hình thư viện dateFormat, equal cho hbs
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'));
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/beltkr', beltkrRouter);
app.use('/weaponkr', weaponkrRouter);
app.use('/adminpage', adminpageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// cấu hình port của server để deploy lên cloud
app.listen(process.env.PORT || 3001);
module.exports = app;
