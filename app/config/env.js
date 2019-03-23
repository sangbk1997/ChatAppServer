const env = {
    database: 'messengerAPI',
    username: 'monty',
    password: 'Hyperlogya@123',
    host: '172.20.40.124',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;