const messengerModel = require('../model/messenger.model');
module.exports = (sequelize, Sequelize) => {
    const Messenger = sequelize.define('messenger', {
        [messengerModel.channelId.title]: {
            type: Sequelize.STRING
        },
        [messengerModel.ownerId.title]: {
            type: Sequelize.STRING
        },
        // [messengerModel.username.title]: {
        //     type: Sequelize.STRING
        // },
        [messengerModel.message.title]: {
            type: Sequelize.STRING
        },
        [messengerModel.emojiUser.title]: {
            type: Sequelize.STRING
        }
    });

    return Messenger;
}