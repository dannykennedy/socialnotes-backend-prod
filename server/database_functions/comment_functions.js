'use strict';

const uuidv4 = require('uuid/v4');
const dbFunctions = require("./db_functions.js");


// Get all comments in a given User
exports.getCommentsByUser = (userId, callback) => {

    const sql = `SELECT * FROM Comments WHERE postedBy= '${userId}'`;
    dbFunctions.makeSqlQuery(sql, callback);
};


exports.getCommentsByNote = (noteID, callback) => {

    const sql = `SELECT commentText FROM Comments WHERE postedOn= '${noteID}'`;
    dbFunctions.makeSqlQuery(sql, callback);
};

exports.addComment = (commentText, userId, postedOn,  callback) => {

    const commentId = uuidv4();
    const datetime = new Date().toLocaleString();
    const sql = `INSERT INTO Comments( commentId, commentText, postedBy, postedOn) VALUES ('${commentId}', '${commentText}', '${userId}', '${postedOn}')`;
    dbFunctions.makeSqlQuery(sql, callback);
};
