var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./mysql-connect');
var callDb = new db();
callDb.closeConnection();

callDb.createDbConnection();
var expvalidator = require('express-validator');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(expvalidator());

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV == 'development' ? err : null;

  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  return res.send('Hello World!!!');
});

app.use('/user', require('./controller/User/SignupController'));
app.use('/user', require('./controller/User/LoginController'));

app.use('/employee', require('./controller/Employee/GetEmployeeController'));
app.use('/employee', require('./controller/Employee/AddEmployeeController'));
app.use('/employee', require('./controller/Employee/DeleteEmployeeController'));
app.use('/employee', require('./controller/Employee/UpdateEmployeeController'));

module.exports = app;
