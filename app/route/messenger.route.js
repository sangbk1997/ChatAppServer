
const db = require('../config/db.config');
const messengerService = require('../service/messenger.service');
const baseService = require('../service/base.service');
var messengerObj = require('../obj/messengerObj');
var $bean = require('../utils/hyd-bean-utils');
var modelType = {
    mapTable: db.messenger,
    mapObj: messengerObj
}
module.exports = function (app) {
    // Create a new Customer
    app.post('/api/messengers', function (req, res) {
        // res.send(baseService.setRedis);
        // res.send(messengers.create(req.body));
        // Sua doi
        // var result = messengerService.saveMessageDB($bean.getJson(req.body));
        // console.log(result);
        // res.send(result);

        // var result = baseService.doInsert(req.body, modelType).then(function (data) {
        //     console.log(data);
        //     res.send(data);
        // })
    });

    // Retrieve all Customer
    app.get('/api/messengers', function (req, res) {
        // messengerService.findAllMessageDB().then(function (data) {
        //     console.log(data);
        //     res.send(data);
        // });

        baseService.list(modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Retrieve a single Customer by Id
    app.get('/api/messengers/:MessengerId', function (req, res) {
        // messengerService.findByPkMessageDB(req.params.MessengerId).then(function (data) {
        //     console.log(data);
        //     res.send(data);
        // });

        baseService.findById(req.params.MessengerId, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Update a Customer with Id
    app.put('/api/messengers/:MessengerId', function (req, res) {
        // messengerService.updateMessageDB(req.params.MessengerId, $bean.getJson(req.body)).then(function (data) {
        //     messengerService.findByPkMessageDB(req.params.MessengerId).then(data => {
        //         res.send(data);
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // });

        baseService.doUpdate(req.params.MessengerId, req.body, modelType).then(function (data) {
            baseService.findById(req.params.MessengerId, modelType).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        });
    });

    // Delete a Customer with Id
    app.delete('/api/messengers/:MessengerId', function (req, res) {
        // messengerService.deleteMessageDB(req.params.MessengerId).then(function () {
        //     var message = 'Successful !';
        //     res.send({'message': message});
        // });

        baseService.doDelete(req.params.MessengerId, modelType).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });
}