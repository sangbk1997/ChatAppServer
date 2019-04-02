const redis = require('../common/config/redis.config');
const socket = require('./socket.service');
const axios = require('axios');
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;
const hostPushStream = 'http://172.20.30.107';
var $bean = require('../common/utils/hyd-bean-utils');

var baseService = {

    // Crud with DB

    doInsert: (value, modelType) => {
        var objStorage = {};
        for (key in modelType.mapObj) {
            objStorage[modelType.mapObj[key].title] = value[key];
        }
        return modelType.mapTable.create(objStorage);
    },

    list: (modelType) => {
        return modelType.mapTable.findAll();
    },

    findById: (id, modelType) => {
        return modelType.mapTable.findByPk(id);
    },

    doUpdate: (id, value, modelType) => {
        var objStorage = {};
        for (key in modelType.mapObj) {
            objStorage[modelType.mapObj[key].title] = value[key];
        }
        return modelType.mapTable.update(objStorage,
            {where: {'id': id}}
        );
    },

    doDelete: (id, modelType) => {
        return modelType.mapTable.destroy({
            where: {id: id}
        });
    },

// CRUD with Redis

    setRedis: (key, value, redisType, channelId, modelType, httpRes) => {
        redisType.set(key, $bean.getJson(value), function (err, reply) {
            if (!err) {
                if (!err) {
                    // console.log('Luu thanh cong vao redis');
                    // console.log('Get data ' + messengerService.get(key, redisType));
                    if (redisType == redisApp) {
                            baseService.doInsert(value, modelType).then(function (res) {
                            // console.log('Set thanh cong va DB ' + res);
                            baseService.deleteRedis(key, redisType);
                            baseService.getRedis(key, redisType);
                            console.log('Data ');
                            console.log(res);
                            httpRes.send(res);
                        }).catch(function (err) {
                            console.log("Error save to DB");
                            baseService.setRedis(key, value, redisType, channelId, modelType);
                        })
                    } else {
                        socket.pubMessage(value).then(res => {
                            console.log('Pub message ');
                            console.log(res);
                            baseService.deleteRedis(key, redisType);
                            baseService.getRedis(key, redisType);
                        }).catch(err => {
                            console.log('Error pub message');
                            baseService.setRedis(key, value, redisType, channelId, modelType);
                        })
                    }
                }
            } else {
                console.log('Error set to redis ' + err);
            }
        });
    },

    getRedis: (key, redisType) => {
        redisType.get(key, function (err, reply) {
            if (err) {
                console.log('Error get ' + key + ' from redis !');
                throw err;
            }
        });
    },

    isExistRedis: (key, redisType) => {
        redisType.exists('language', function (err, reply) {
            if (!err) {
                if (reply === 1) {
                    console.log(key + " exists in redis !");
                } else {
                    console.log(key + " does't exists in redis !");
                }
            }
        });
    },

    deleteRedis: (key, redisType) => {
        redisType.del(key, function (err, reply) {
            if (!err) {
                if (reply === 1) {
                    console.log(key + " is deleted from redis !");
                } else {
                    console.log(key + " does't exists in redis !");
                }
            }
        });
    },

    expireRedis: (key, time, redisType) => {
        redisType.expire(key, time); // Expirty time for 30 seconds.
    }
}

module.exports = baseService;