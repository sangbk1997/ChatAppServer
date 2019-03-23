module.exports = function (app) {

    var socketService = require('../service/socket.service');
    var redisService = require('../service/redis.service');
    var redisApp = redisService.redisApp;
    var redisPushStream = redisService.redisPushStream;

    app.get('/ws', function (req, res) {
        res.send(socketService.listenPub());
    });

    app.post('/pub', function (req, res) {
        res.send(redisService.saveMessageToRedis(req.body, redisPushStream));
    });
}
