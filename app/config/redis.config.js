
var redis = require('redis');
var redisApp = redis.createClient(6379, '172.20.40.132');
var redisPushStream = redis.createClient(6379, '172.20.30.107');

redisApp.on('connect', function () {
    console.log('RedisApp client connected');
});

redisApp.on('error', function (err) {
    console.log('RedisApp have something went wrong ' + err);
});

redisPushStream.on('connect', function () {
    console.log('RedisPushStream client connected');
});

redisPushStream.on('error', function (err) {
    console.log('RedisPushStream have something went wrong ' + err);
});

module.exports = {'redisApp': redisApp, 'redisPushStream': redisPushStream};

