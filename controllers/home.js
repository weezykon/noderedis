// import redis
const redis = require('redis');

// json
const club = require('./../club.json');

// dotenv
const dotenv = require('dotenv');
dotenv.config();

// redis client
const client = redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});

exports.home = async (req, res, next) => {
    const searchTerm = req.query.search;
    try {
        client.get('clubs', async (err, reply) => {
            if (err) throw err;
    
            if (reply) {
                const { clubs } = JSON.parse(reply);
                res.render('index', { title: 'Redis Second League Clubs', clubs });
            }
            else {
                client.set('clubs', JSON.stringify(club));
                console.log('clubs set');
                res.render('index', { title: 'Redis Second League Clubs', clubs: club.clubs });
            }
        });
    } catch(err) {
        console.log(err.message);
    }
};

const getClubs = () => {
    return new Promise((resolve, reject) => {
        client.get('clubs', (err, clubs) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(clubs));
            }
        });
    });
};