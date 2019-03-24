module.exports = function (app) {

    const socketService = require('../service/socket.service');
    const messengerService = require('../service/messenger.service');
    const redis = require('../config/redis.config');
    const redisApp = redis.redisApp;
    const redisPushStream = redis.redisPushStream;
    app.get('/ws', function (req, res) {
        console.log(req);
        res.send(socketService.subMessage('ch0', 'user0'));
    });

    app.post('/pub', function (req, res) {
        console.log(req);
        console.log(messengerService);
        res.send(messengerService.set('message', req.body, redisApp));
        res.send(messengerService.set('message', req.body, redisPushStream));
    });
}
