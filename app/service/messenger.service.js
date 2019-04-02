const db = require('../common/config/db.config.js');
const redis = require('../common/config/redis.config');
const socket = require('./socket.service');
const Messenger = db.messenger;
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;

var messengerService = {

    listByChannel : (channelId) => {
        return Messenger.findAll({where : {channelId : channelId}});
    },

    listByUser : (userId) => {
        return Messenger.findAll({where: {ownerId: userId}});
    },

    getNumberMessenger : (channelId, number, offset = 0) => {
        return Messenger.findAll({where : {channelId: channelId}, offset: offset,  limit: number, order : [['createdAt' , 'DESC']]});
    }
}

module.exports = messengerService;