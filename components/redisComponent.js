const dotenv = require('dotenv');
const asyncRedis = require("async-redis");

dotenv.config();

// redis client
const client = asyncRedis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});
client.on('error', function (err) {
    console.log('Error ' + err);
});

client.on('connect', function(){
    console.log('Connected to Redis...');
});


// save data
const saveData = async (club) => {
    await client.set('clubs', JSON.stringify(club));
    return true;
}
module.exports.saveData = saveData;

// get data
const getData = async (value) => {
    const data = await client.get(value);
    return JSON.parse(data);
}
module.exports.getData = getData;

