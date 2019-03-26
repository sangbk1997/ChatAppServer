const messengerObj = require('../obj/messengerObj');
var $bean = require('../utils/hyd-bean-utils');
module.exports = (sequelize, Sequelize) => {
    const Messenger = sequelize.define('messenger', {
        [messengerObj.channelId.title]: {
            type: Sequelize.STRING
        },
        [messengerObj.ownerId.title]: {
            type: Sequelize.STRING
        },
        [messengerObj.message.title]: {
            type: Sequelize.STRING
        },
        [messengerObj.emojiUser.title]: {
            type: Sequelize.STRING
        }
    });

    return Messenger;
}