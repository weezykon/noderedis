// import redis component
const {
    getData,
} = require('./../components/redisComponent');

exports.home = async (req, res, next) => {
    try {
        const data = await getData('clubs');
        res.render('index', { title: 'Redis Second League Clubs', clubs: data.clubs });
    } catch(err) {
        console.log(err.message);
    }
};