'use strict';
const mysql = require('mysql');

//Better would be ~ password: process.env.MYSQL_PASS etc
let pool = mysql.createPool({
    host: 'remotemysql.com',
    port: '3306',
    user: 'MKwyWiebEa',
    password: 'ZJ27tpGaIF',
    database: 'MKwyWiebEa',
    connectionLimit: 10,
    supportBigNumbers: true,
    multipleStatements: true
});

module.exports = {
    getConnection: (callback) => {
        return pool.getConnection(callback);
    }
};
