var axios = require('axios');
var $bean = require('../common/utils/hyd-bean-utils');
var hostPushStream = 'http://172.20.30.107';
var socket = {
    subMessage: (channelId, userId) => {
        var result = {channelId: channelId, userId : userId};
        return result;
    },

    pubMessage: (messenger) => {
        var url = hostPushStream + '/pub?id=channel_' + messenger['channelId'];
        console.log('Pub url ' + url);
        return axios.post(url, $bean.encodeObject(messenger));
    }
}

module.exports = socket;