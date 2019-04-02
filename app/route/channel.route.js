const db = require('../common/config/db.config');
const channelService = require('../service/channel.service');
const baseService = require('../service/base.service');
var channelModel = require('../model/channel.model');
var $bean = require('../common/utils/hyd-bean-utils');
var modelType = {
    mapTable: db.channel,
    mapObj: channelModel
}
module.exports = function (app) {
    app.post('/channels', function (req, res) {
        baseService.doInsert(req.body, modelType).then(function (data) {
            console.log('PostChannel : ' + data);
            res.send(data);
        })
    });

    app.get('/channels', function (req, res) {
        baseService.list(modelType).then(function (data) {
            console.log('Channels : ' + data);
            res.send(data);
        });
    });

    app.get('/channels/:channelId', function (req, res) {
        baseService.findById(req.params.channelId, modelType).then(function (data) {
            console.log('Get channel : ' + data);
            res.send(data);
        });
    });

    app.put('/channels/:channelId', function (req, res) {
        baseService.doUpdate(req.params.channelId, req.body, modelType).then(function (data) {
            baseService.findById(req.params.channelId, modelType).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        });
    });

    app.delete('/channels/:channelId', function (req, res) {
        baseService.doDelete(req.params.channelId, modelType).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });

    app.get('/channelsByUser/:userId', function (req, res) {
        channelService.listChannelByUser(req.params.userId).then(function (data) {
            res.send(data);
        });
    });

    app.get('/channelsByDate/byDate', function (req, res) {
        channelService.listChannelByCreated().then(function (data) {
            res.send(data);
        });
    });

    app.get('/channelsByAlpha/byDESC', function (req, res) {
        channelService.listChannelDESC().then(function (data) {
            res.send(data);
        });
    });

    app.get('/channelsByAlpha/byASC', function (req, res) {
        channelService.listChannelASC().then(function (data) {
            res.send(data);
        });
    });

    app.get('/channelsByNumber/:numberChannel', function (req, res) {
        channelService.getNumberChannel(req.params.numberChannel).then(function (data) {
            res.send(data);
        });
    });
}