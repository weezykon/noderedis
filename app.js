const express = require('express');
const cors = require('cors');
const pug = require('pug');
const path = require('path');
const app = express();

// dotenv
const dotenv = require('dotenv');
dotenv.config();

// routers
const indexRouter = require('./routes/index');

// views
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// styles
app.use(express.static(path.join(__dirname, 'public')));

// urlencoded
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

app.use('/', indexRouter);

module.exports = app;