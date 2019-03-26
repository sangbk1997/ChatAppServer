const db = require('../config/db.config');
const userService = require('../service/user.service');
const baseService = require('../service/base.service');
var userObj = require('../obj/userObj');
var $bean = require('../utils/hyd-bean-utils');
var modelType = {
    mapTable: db.user,
    mapObj: userObj
}
module.exports = function (app) {
    app.post('/users', function (req, res) {
        var result = baseService.doInsert(req.body, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        })
    });

    // Retrieve all Customer
    app.get('/users', function (req, res) {
        baseService.list(modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Retrieve a single Customer by Id
    app.get('/users/:userId', function (req, res) {
        baseService.findById(req.params.userId, modelType).then(function (data) {
            console.log(data);
            res.send(data);
        });
    });

    // Update a Customer with Id
    app.put('/users/:userId', function (req, res) {
        baseService.doUpdate(req.params.userId, req.body, modelType).then(function (data) {
            baseService.findById(req.params.userId, modelType).then(data => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            })
        });
    });

    // Delete a Customer with Id
    app.delete('/users/:userId', function (req, res) {
        baseService.doDelete(req.params.userId, modelType).then(function () {
            var message = 'Successful !';
            res.send({'message': message});
        });
    });

    app.post('/user/signup', function (req, res) {
        var result = baseService.doInsert(req.body, modelType).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            res.send(null);
        })
    })

    app.post('/user/login', function (req, res) {
        userService.login(req.body).then(function (data) {
            if ($bean.isNotNil(data)) {
                res.send(data);
            } else {
                res.send(null);
            }
        }).catch(function (err) {
            res.send(null);
        })
    })

    app.post('/user/signout', function (req, res) {

    })

    app.post('/user/quickUpdate', function (req, res) {

    })
}