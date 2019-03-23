var axios = require('axios');
var redisServer = require('./redis.service');
exports.listenSub = (idChannel, idUser) => {
    return {channel: idChannel};
}

exports.listenPub = (message, idChannel, idUser) => {
    var url = 'http://172.20.30.107/pub?id=' + idChannel;
    return axios.post(url, encodeURIComponent(JSON.stringify(message)));
}