var axios = require('axios');
var $bean = require('../utils/hyd-bean-utils');
var hostPushStream = 'http://172.20.30.107';
var socket = {
    subMessage: (idChannel, idUser) => {
        var result = {channel: idChannel};
        return result;
    },

    pubMessage: (idChannel, message, idUser) => {
        var url = hostPushStream + '/pub?id=' + idChannel;
        return axios.post(url, $bean.encodeObject(message));
    }
}

module.exports = socket;