const userModel = require('../model/user.model');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        [userModel.username.title]: {
            type: Sequelize.STRING
        },
        [userModel.password.title]: {
            type: Sequelize.STRING
        },
        [userModel.firstName.title]: {
            type: Sequelize.STRING
        },
        [userModel.middleName.title]: {
            type: Sequelize.STRING
        },
        [userModel.lastName.title]: {
            type: Sequelize.STRING
        },
        [userModel.email.title]: {
            type: Sequelize.STRING
        },
        [userModel.avatar.title]: {
            type: Sequelize.STRING
        },
        [userModel.location.title]: {
            type: Sequelize.STRING
        },
        [userModel.phone.title]: {
            type: Sequelize.STRING
        },
        [userModel.birthDay.title]: {
            type: Sequelize.DATE
        },
        [userModel.gender.title]: {
            type: Sequelize.DECIMAL
        },
        [userModel.facebook.title]: {
            type: Sequelize.STRING
        },
        [userModel.systemAdmin.title]: {
            type: Sequelize.DECIMAL
        }
    });

    return User;
}