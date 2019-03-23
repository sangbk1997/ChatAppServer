const db = require('../config/db.config.js');
const Messenger = db.messenger;

// Post a Messenger
exports.create = (value) => {
    return Messenger.create({
        message: value
    });
};

// FETCH all Messengers
exports.findAll = () => {
    return Messenger.findAll();
};

// Find a Messenger by Id
exports.findByPk = (messengerId) => {
    return Messenger.findByPk(messengerId);
};

// Update a Messenger
exports.update = (messengerId, message) => {
    const id = messengerId;
    return Messenger.update({message: message},
        {where: {id: id}}
    );
};

// Delete a Messenger by Id
exports.delete = (messengerId) => {
    const id = messengerId;
    return Messenger.destroy({
        where: {id: id}
    });
};