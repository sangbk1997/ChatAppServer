const channelObj = require('../obj/channelObj');
var $bean = require('../utils/hyd-bean-utils');
module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define('channel', {
        [channelObj.ownerId.title]: {
            type: Sequelize.STRING
        },
        [channelObj.status.title]: {
            type: Sequelize.STRING
        },
        [channelObj.admins.title]: {
            type: Sequelize.STRING
        },
        [channelObj.members.title]: {
            type: Sequelize.STRING
        },
        [channelObj.title.title]: {
            type: Sequelize.STRING
        },
        [channelObj.avatar.title]: {
            type: Sequelize.STRING
        },
        [channelObj.colorHeader.title]: {
            type: Sequelize.STRING
        },
        [channelObj.backgroundColor.title]: {
            type: Sequelize.STRING
        }

    });
    return Channel;
}