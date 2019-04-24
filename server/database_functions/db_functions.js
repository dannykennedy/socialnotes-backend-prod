'use strict';

const db = require('../db.js');

exports.makeSqlQuery = (sql, callback) => {
    // get a connection from the pool
    db.getConnection(function(err, connection) {
        //callback if server error
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.escapeString = (stringToEscape) => {
    stringToEscape = stringToEscape.replace('\'', '\\\'');
    stringToEscape = stringToEscape.replace('\;', '\\\;');
    return stringToEscape;
};