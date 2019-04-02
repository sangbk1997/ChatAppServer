const envDB = require('./env.js').mysqlDB;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(envDB.database, envDB.username, envDB.password, {
    host: envDB.host,
    dialect: envDB.dialect,
    operatorsAliases: false,

    pool: {
        max: envDB.max,
        min: envDB.pool.min,
        acquire: envDB.pool.acquire,
        idle: envDB.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.messenger = require('../../mapping/messenger.mapping.js')(sequelize, Sequelize);
db.user = require('../../mapping/user.mapping')(sequelize, Sequelize);
db.channel = require('../../mapping/channel.mapping')(sequelize, Sequelize);

module.exports = db;