let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let favicon = require('serve-favicon');
let logger = require('morgan');
let nunjucks = require('nunjucks');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
let mongoose = require('mongoose');

dotenv.config();
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');
nunjucks.configure('views', { autoescape: true });
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

let mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.3xzkv.mongodb.net/locallibrary?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('common'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
