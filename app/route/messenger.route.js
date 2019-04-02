const db = require('../common/config/db.config');
const messengerService = require('../service/messenger.service');
const baseService = require('../service/base.service');
var messengerObj = require('../model/messenger.model');
var $bean = require('../common/utils/hyd-bean-utils');
var modelType = {
    mapTable: db.messenger,
    mapObj: messengerObj
}
module.exports = function (app) {

    app.post('/messengers', function (req, res) {
        var result = baseService.doInsert(req.body, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        })
    });

    app.get('/messengers', function (req, res) {
        baseService.list(modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    app.get('/messengers/:MessengerId', function (req, res) {
        baseService.findById(req.params.MessengerId, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    app.put('/messengers/:MessengerId', function (req, res) {
        baseService.doUpdate(req.params.MessengerId, req.body, modelType).then(function (data) {
            baseService.findById(req.params.MessengerId, modelType).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        });
    });

    app.delete('/messengers/:MessengerId', function (req, res) {
        baseService.doDelete(req.params.MessengerId, modelType).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });

    app.get('/messengersByChannel/:channelId', function (req, res) {
        messengerService.listByChannel(req.params.channelId).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    app.post('/messengersByUser/:userId', function (req, res) {
        messengerService.listByUser(req.params.userId).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    app.post('/messengerByNumber', function (req, res) {
        messengerService.getNumberMessenger(req.body.channelId, req.body.number, req.body.offset).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });
}