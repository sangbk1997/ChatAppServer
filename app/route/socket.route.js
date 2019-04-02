const socketService = require('../service/socket.service');
const redis = require('../common/config/redis.config');
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;
const messengerService = require('../service/messenger.service');
const baseService = require('../service/base.service');
var messengerModel = require('../model/messenger.model');
var db = require('../common/config/db.config');
var $bean = require('../common/utils/hyd-bean-utils');
var modelType = {
    mapTable: db.messenger,
    mapObj: messengerModel
}

module.exports = function (app) {
    app.post('/ws', function (req, res) {
        console.log(req.body);
        res.send(socketService.subMessage(req.body.idChannel, req.body.idUser));
    });

    app.post('/pub', function (req, res) {
        baseService.setRedis('message' + '_' + req.query.id, req.body, redisPushStream, req.query.id, modelType, res);
        baseService.setRedis('message' + '_' + req.query.id, req.body, redisApp, req.query.id, modelType, res);
    });
}
