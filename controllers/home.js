// import redis
const redis = require('redis');

// redis client
const client = redis.createClient(process.env.REDIS_URL);

exports.home = async (req, res, next) => {
    const { clubs } = await getClubs();
    console.log(clubs);
    res.render('index', { title: 'Redis Second League Clubs', clubs });
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