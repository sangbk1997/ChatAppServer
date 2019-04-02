const envRedisApp = require('./env').redisApp;
const envRedisPushstream = require('./env').redisPushstream;
var redis = require('redis');
var redisApp = redis.createClient(envRedisApp.port, envRedisApp.host);
var redisPushStream = redis.createClient(envRedisPushstream.port, envRedisPushstream.host);

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

