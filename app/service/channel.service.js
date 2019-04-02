const db = require('../common/config/db.config.js');
const redis = require('../common/config/redis.config');
const socket = require('./socket.service');
const Channel = db.channel;
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;

var channelService = {

    listChannelByUser : (userId) => {
        return Channel.findAll({where : {ownerId : userId}});
    },

    listChannelByCreated : () => {
        return Channel.findAll({order : ['createdDate', 'ASC']});
    },

    listChannelDESC : () => {
        return Channel.findAll({order : ['title', 'DESC']});
    },

    listChannelASC : () => {
        return Channel.findAll({order : ['title', 'ASC']});
    },

    getNumberChannel : (number) => {
        return Channel.findAll({limit: number});
    }
}

module.exports = channelService;