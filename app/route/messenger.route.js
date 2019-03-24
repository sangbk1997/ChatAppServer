
const db = require('../config/db.config');
const messenger = db.messenger;
module.exports = function (app) {
    // Create a new Customer
    app.post('/api/messengers', function (req, res) {
        // res.send(redisServer.saveMessageToRedis(req.body, redisPushStream));
        // res.send(messengers.create(req.body));
        messenger.create(req.body.message).then(function(data){
            console.log(data);
            res.send(data);
        })
    });

    // Retrieve all Customer
    app.get('/api/messengers', function (req, res) {
        messenger.findAll().then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Retrieve a single Customer by Id
    app.get('/api/messengers/:MessengerId', function (req, res) {
        messenger.findByPk(req.params.MessengerId).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Update a Customer with Id
    app.put('/api/messengers/:MessengerId', function (req, res) {
        messenger.update(req.params.MessengerId, req.body.message).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Delete a Customer with Id
    app.delete('/api/messengers/:MessengerId', function (req, res) {
        messenger.delete(req.params.MessengerId).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });
}