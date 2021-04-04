var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var cors = require('cors');
const { response } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//CORS
app.use(cors());

//Slow down the server (Middleware)
// Used for Loading Message
// app.use(function(req, res, next) {
//     setTimeout(next, 1000);
// });


//Fake Error
// app.use(function(req, res, next) {
//     //If any digits are in the URL
//    if(req.url.match(/\d+/)){
//     response.setStatus(500);
//    }
//    else {
//        next();
//    }
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500).json({ 'error': err.toString() });
    //res.render('error');
});

module.exports = app;