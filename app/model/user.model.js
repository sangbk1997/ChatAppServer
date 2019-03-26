const userObj = require('../obj/userObj');
var $bean = require('../utils/hyd-bean-utils');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        [userObj.username.title]: {
            type: Sequelize.STRING
        },
        [userObj.password.title]: {
            type: Sequelize.STRING
        },
        [userObj.firstName.title]: {
            type: Sequelize.STRING
        },
        [userObj.middleName.title]: {
            type: Sequelize.STRING
        },
        [userObj.lastName.title]: {
            type: Sequelize.STRING
        },
        [userObj.email.title]: {
            type: Sequelize.STRING
        },
        [userObj.avatar.title]: {
            type: Sequelize.STRING
        },
        [userObj.location.title]: {
            type: Sequelize.STRING
        },
        [userObj.phone.title]: {
            type: Sequelize.STRING
        },
        [userObj.birthDay.title]: {
            type: Sequelize.DATE
        },
        [userObj.gender.title]: {
            type: Sequelize.DECIMAL
        },
        [userObj.facebook.title]: {
            type: Sequelize.STRING
        },
        [userObj.systemAdmin.title]: {
            type: Sequelize.DECIMAL
        }
    });

    return User;
}