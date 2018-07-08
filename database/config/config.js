require('dotenv').config({path: '../.env'});
module.exports = {
    'development': {
        'username': process.env.DB_USER || 'root',
        'password': process.env.DB_PASSWORD || null,
        'database': process.env.DB_NAME || 'database_development',
        'host': process.env.DB_HOST || '127.0.0.1',
        'dialect': 'mysql',
        'port': (process.env.DB_PORT && parseInt(process.env.DB_PORT, 10)) || '3306'
    },
    'test': {
        'username': 'root',
        'password': null,
        'database': 'database_test',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    },
    'production': {
        'username': 'root',
        'password': null,
        'database': 'database_production',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    }
};
