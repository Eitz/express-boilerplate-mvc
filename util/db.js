const mysql = require('mysql');

const source = {
    development: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test_db'
    },
    production: {}
}

const sourceKey = process.env.ENV || 'development';

const connection = mysql.createConnection(source[sourceKey]);

connection.connect(function(err) {
    if (err) {
        console.error('[MySQL] Error connecting: ' + err.stack);
        return;
    }

    console.log(`[MySQL] Connected at ${source[sourceKey].host}:${source[sourceKey].port}`);
});

module.exports = connection;