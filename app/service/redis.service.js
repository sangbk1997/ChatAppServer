var redis = require('redis');
var redisApp = redis.createClient(6379, '172.20.40.132');
var redisPushStream = redis.createClient(6379, '172.20.30.107');
var Messenger = require('./messenger.service');
var Socket = require('./socket.service');

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

function saveMessageFromRedis() {
    var message = getMessageFromRedis(redisApp);
    if (message) {
        setTimeout(function () {
            Messenger.create(message);
            deleteMessageFromRedis();
        }, 1000);
    }
    if (getMessageFromRedis(redisApp)) {
        saveMessageFromRedis();
    }
}

function pubMessageToPushStream() {
    var message = getMessageFromRedis(redisPushStream);
    if (message) {
        Socket.listenPub(message, 'ch0', 'user0').then(function (response) {
            deleteMessageFromRedis(redisPushStream);
        }).catch(function (error) {
            pubMessageToPushStream();
        })
    }
}

exports.redisApp = redisApp;
exports.redisPushStream = redisPushStream;
exports.saveMessageToRedis = (message, redisType) => {
    redisType.set('message', message, function (err, reply) {
        if (err) {
            throw err;
        }
        if (redisType == redisApp) {
            saveMessageFromRedis();
        }
        if (redisType == redisPushStream) {
            pubMessageToPushStream();
        }
        return reply;
    });
}

exports.getMessageFromRedis = (redisType) => {
    redisType.get('message', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log('GET result ->' + result);
        return result;
    })
};

exports.deleteMessageFromRedis = (redisType) => {
    redisType.del('message');
    return 'OK';
}