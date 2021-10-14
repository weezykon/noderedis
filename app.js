const express = require('express');
const cors = require('cors');
const pug = require('pug');
const path = require('path');
const { saveData } = require('./components/redisComponent');
const app = express();

// routers
const indexRouter = require('./routes/index');

// views
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// styles
app.use(express.static(path.join(__dirname, 'public')));

// json
const club = require('./club.json');

// urlencoded
app.use(express.urlencoded({ extended: true }));

// save data to redis
app.use(async (req, res, next) => {
    try {
        await saveData(club);
        next();
    } catch (error) {
        console.log(error);
    }
})

// cors
app.use(cors());

app.use('/', indexRouter);

module.exports = app;