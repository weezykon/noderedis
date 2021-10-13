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
    try {
        client.get('clubs', async (err, reply) => {
            if (err) throw err;
    
            if (reply === null) {
                await client.set('clubs', JSON.stringify(club));
            }
        });
        next();
    } catch(err) {
        console.log(err.message);
    }
})

// cors
app.use(cors());

app.use('/', indexRouter);

module.exports = app;