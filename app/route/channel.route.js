const db = require('../config/db.config');
const channelService = require('../service/channel.service');
const baseService = require('../service/base.service');
var channelObj = require('../obj/channelObj');
var $bean = require('../utils/hyd-bean-utils');
var modelType = {
    mapTable: db.channel,
    mapObj: channelObj
}
module.exports = function (app) {
    // Create a new Customer
    app.post('/channels', function (req, res) {
        // res.send(redisServer.saveMessageToRedis(req.body, redisPushStream));
        // res.send(channels.create(req.body));
        // Sua doi
        // var result = channelservice.saveMessageDB($bean.getJson(req.body));
        // console.log(result);
        // res.send(result);

        var result = baseService.doInsert(req.body, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        })
    });

    // Retrieve all Customer
    app.get('/channels', function (req, res) {
        // channelservice.findAllMessageDB().then(function (data) {
        //     console.log(data);
        //     res.send(data);
        // });

        baseService.list(modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Retrieve a single Customer by Id
    app.get('/channels/:channelId', function (req, res) {
        // channelservice.findByPkMessageDB(req.params.channelId).then(function (data) {
        //     console.log(data);
        //     res.send(data);
        // });

        baseService.findById(req.params.channelId, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Update a Customer with Id
    app.put('/channels/:channelId', function (req, res) {
        // channelservice.updateMessageDB(req.params.channelId, $bean.getJson(req.body)).then(function (data) {
        //     channelservice.findByPkMessageDB(req.params.channelId).then(data => {
        //         res.send(data);
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // });

        baseService.doUpdate(req.params.channelId, req.body, modelType).then(function (data) {
            baseService.findById(req.params.channelId, modelType).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        });
    });

    // Delete a Customer with Id
    app.delete('/channels/:channelId', function (req, res) {
        // channelservice.deleteMessageDB(req.params.channelId).then(function () {
        //     var message = 'Successful !';
        //     res.send({'message': message});
        // });

        baseService.doDelete(req.params.channelId, modelType).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });
}