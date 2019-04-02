const channelModel = require('../model/channel.model');
module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define('channel', {
        [channelModel.ownerId.title]: {
            type: Sequelize.STRING
        },
        [channelModel.status.title]: {
            type: Sequelize.STRING
        },
        [channelModel.admins.title]: {
            type: Sequelize.STRING
        },
        [channelModel.members.title]: {
            type: Sequelize.STRING
        },
        [channelModel.title.title]: {
            type: Sequelize.STRING
        },
        [channelModel.avatar.title]: {
            type: Sequelize.STRING
        },
        [channelModel.colorHeader.title]: {
            type: Sequelize.STRING
        },
        [channelModel.backgroundColor.title]: {
            type: Sequelize.STRING
        }

    });
    return Channel;
}