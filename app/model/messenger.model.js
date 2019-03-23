module.exports = (sequelize, Sequelize) => {
    const Messenger = sequelize.define('messenger', {
        message: {
            type: Sequelize.STRING
        }
    });

    return Messenger;
}