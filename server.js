var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json())
app.use(cors());

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
    console.log('Drop and Resync with { force: true }');
});

require('./app/route/messenger.route')(app);
require('./app/route/socket.route')(app);
require('./app/route/app.route')(app);

// Create a Server
var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})