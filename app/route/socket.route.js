const socketService = require('../service/socket.service');
const redis = require('../config/redis.config');
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;
const messengerService = require('../service/messenger.service');
const baseService = require('../service/base.service');
var messengerObj = require('../obj/messengerObj');
var db = require('../config/db.config');
var $bean = require('../utils/hyd-bean-utils');
var modelType = {
    mapTable: db.messenger,
    mapObj: messengerObj
}
module.exports = function (app) {
    app.get('/ws', function (req, res) {
        console.log(req.query.id);
        res.send(socketService.subMessage(req.query.id, 'user0'));
    });

    app.post('/pub', function (req, res) {
        res.send(baseService.setRedis('message' + '_' + req.query.id, req.body, redisApp, req.query.id, modelType));
        res.send(baseService.setRedis('message' + '_' + req.query.id, req.body, redisPushStream, req.query.id, modelType));
    });
}
