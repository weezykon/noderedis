const express = require('express');
const cors = require('cors');
const redis = require('redis');
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

// json
const club = require('./club.json');

// redis client
const client = redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});

// urlencoded
app.use(express.urlencoded({ extended: true }));

// save data to redis
app.use(async (req, res, next) => {
    // check if redis has data clubs
    await client.get('clubs', (err, data) => {
        if (err) {
            console.log(err);
        } else if (data == null) {
            // save data to redis
            client.set('clubs', JSON.stringify(club));
            next();
        } else {
            next();
        }
    });
})

// cors
app.use(cors());

app.use('/', indexRouter);

module.exports = app;