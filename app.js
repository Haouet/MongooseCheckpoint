var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personsRouter = require('./routes/persons');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
require("dotenv").config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/persons', personsRouter);
// app.post('/add', personsRouter);
// app.get('/per', personsRouter);
// app.get('/findone', personsRouter);
// app.get('/findbyid/:id', personsRouter);
// app.post('/addall', personsRouter);
// app.delete('/remove/:id', personsRouter);
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
// Connect databasse Mongodb Atlas
mongoose.connect(process.env.MONGO_URI, (err,done) =>{
 if(err){
  console.log(err);
 }
 if(done){
    console.log('BD est connecter avec succes');
 }
});
module.exports = app;
