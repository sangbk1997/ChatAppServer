const redis = require('../config/redis.config');
const socket = require('./socket.service');
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;
var $bean = require('../utils/hyd-bean-utils');

var baseService = {
    // CRUD with DB

    // Post a Messenger
    doInsert: (value, modelType) => {
        var objStorage = {};
        // console.log(modelType.mapObj)
        for (key in modelType.mapObj) {
            objStorage[modelType.mapObj[key].title] = value[key];
        }
        return modelType.mapTable.create(objStorage);
    },

// FETCH all Messengers
    list: (modelType) => {
        return modelType.mapTable.findAll();
    },

// Find a Messenger by Id
    findById: (id, modelType) => {
        return modelType.mapTable.findByPk(id);
    },

// Update a Messenger
    doUpdate: (id, value, modelType) => {
        var objStorage = {};
        for (key in modelType.mapObj) {
            objStorage[modelType.mapObj[key].title] = value[key];
        }
        return modelType.mapTable.update(objStorage,
            {where: {'id': id}}
        );
    },

// Delete a Messenger by Id
    doDelete: (id, modelType) => {
        return modelType.mapTable.destroy({
            where: {id: id}
        });
    },

// CRUD with Redis

    setRedis: (key, value, redisType, channelId, modelType) => {
        redisType.set(key, $bean.getJson(value), function (err, reply) {
            if (!err) {
                // console.log('Luu thanh cong vao redis');
                // console.log('Get data ' + messengerService.get(key, redisType));
                if (redisType == redisApp) {
                    baseService.doInsert(value, modelType).then(function (res) {
                        // console.log('Set thanh cong va DB ' + res);
                        baseService.deleteRedis(key, redisType);
                        baseService.getRedis(key, redisType);
                    }).catch(function (err) {
                        console.log("Error save to DB");
                        baseService.setRedis(key, value, redisType, channelId, modelType);
                    })
                } else {
                    socket.pubMessage(channelId, value, '1').then(res => {
                        console.log('Pub message ');
                        console.log(res);
                        baseService.deleteRedis(key, redisType);
                        baseService.getRedis(key, redisType);
                    }).catch(err => {
                        console.log('Error pub message');
                        baseService.setRedis(key, value, redisType, channelId, modelType);
                    })
                }
                return JSON.stringify({key: value});
            } else {
                console.log(err);
            }
        });
    },

    getRedis: (key, redisType) => {
        redisType.get(key, function (err, reply) {
            if (err) {
                throw err;
            }
            console.log(reply);
        });
    },

    isExistRedis: (key, redisType) => {
        redisType.exists('language', function (err, reply) {
            if (!err) {
                if (reply === 1) {
                    console.log("Key exists");
                } else {
                    console.log("Does't exists");
                }
            }
        });
    },

    deleteRedis: (key, redisType) => {
        redisType.del(key, function (err, reply) {
            if (!err) {
                if (reply === 1) {
                    console.log("Key is deleted");
                } else {
                    console.log("Does't exists");
                }
            }
        });
    },

    expireRedis: (key, time, redisType) => {
        redisType.expire(key, time); // Expirty time for 30 seconds.
    }
}

module.exports = baseService;