module.exports = function (app) {

    const messengers = require('../service/messenger.service.js');
    const redisServer = require('../service/redis.service');
    const redisApp = redisServer.redisApp;
    const redisPushStream = redisServer.redisPushStream;

    // Create a new Customer
    app.post('/api/messengers', function (req, res) {
        res.send(redisServer.saveMessageToRedis(req.body.message, redisApp));
        // res.send(redisServer.saveMessageToRedis(req.body, redisPushStream));
        // res.send(messengers.create(req.body));
        // messengers.create(req.body.message).then(function(data){
        //     console.log(data);
        //     res.send(data);
        // })
    });

    // Retrieve all Customer
    app.get('/api/messengers', function (req, res) {
        messengers.findAll().then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Retrieve a single Customer by Id
    app.get('/api/messengers/:MessengerId', function (req, res) {
        messengers.findByPk(req.params.MessengerId).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Update a Customer with Id
    app.put('/api/messengers/:MessengerId', function (req, res) {
        messengers.update(req.params.MessengerId, req.body.message).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Delete a Customer with Id
    app.delete('/api/messengers/:MessengerId', function (req, res) {
        messengers.delete(req.params.MessengerId).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });
}