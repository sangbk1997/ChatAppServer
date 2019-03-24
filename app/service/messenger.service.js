const db = require('../config/db.config.js');
const redis = require('../config/redis.config');
const socket = require('./socket.service');
const Messenger = db.messenger;
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;

var messengerService = {
    // CRUD with DB

    // Post a Messenger
    saveMessageDB: (value) => {
        return Messenger.create({
            message: value
        });
    },

// FETCH all Messengers
    findAllMessageDB: () => {
        return Messenger.findAll();
    },

// Find a Messenger by Id
    findByPkMessageDB: (messengerId) => {
        return Messenger.findByPk(messengerId);
    },

// Update a Messenger
    updateMessageDB: (messengerId, message) => {
        const id = messengerId;
        return Messenger.update({message: message},
            {where: {id: id}}
        );
    },

// Delete a Messenger by Id
    deleteMessageDB: (messengerId) => {
        const id = messengerId;
        return Messenger.destroy({
            where: {id: id}
        });
    },

// CRUD with Redis

    set: (key, value, redisType) => {
        redisType.set(key, value, function (err, reply) {
            if (!err) {
                console.log(reply);
                if (redisType == redisApp) {
                      messengerService.saveMessageDB(value.toString()).then(function (res) {
                        console.log(res);
                        messengerService.delete(key, redisType);
                    }).catch(function (err) {
                        messengerService.set(key, value, redisType);
                    })
                }else{
                    socket.pubMessage('ch0', value, 'user01').then(res => {
                        console.log(res);
                    }).catch(err => {
                        messengerService.set(key, value, redisType);
                    })
                }
                return JSON.stringify({key: value});
            } else {
                console.log(err);
            }
        });
    },

    get: (key, redisType) => {
        redisType.get(key, function (err, reply) {
            if (err) {
                throw err;
            }
            console.log(reply);
        });
    },

    isExist: (key, redisType) => {
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

    delete: (key, redisType) => {
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

    expire: (key, time, redisType) => {
        redisType.expire(key, time); // Expirty time for 30 seconds.
    }
}

module.exports = messengerService;