const db = require('../common/config/db.config.js');
const redis = require('../common/config/redis.config');
const socket = require('./socket.service');
const redisApp = redis.redisApp;
const redisPushStream = redis.redisPushStream;
const User = db.user;
var $bean = require('../common/utils/hyd-bean-utils');

var userService = {

    login: (form) => {
        if ($bean.isNotNil(form)) {
            let username = form.username;
            let password = form.password;
            if ($bean.isNotNil(username) && $bean.isNotNil(password)) {
                return User.findOne({where: {username: username, password: password}});
            }
        }
    }
}

module.exports = userService;