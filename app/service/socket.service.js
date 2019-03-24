var axios = require('axios');
var hostPushStream = 'http://172.20.30.107';
var socket = {
    subMessage: (idChannel, idUser) => {
        var result = {channel: idChannel};
        console.log(result);
        return result;
    },

    pubMessage: (idChannel, message, idUser) => {
        console.log(idChannel + 'channel');
        var url = hostPushStream + '/pub?id=' + idChannel;
        return axios.post(url, encodeURIComponent(JSON.stringify(message)));
    }
}

module.exports = socket;