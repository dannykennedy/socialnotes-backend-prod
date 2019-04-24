'use strict';

const dbFunctions = require("./db_functions.js");

// CREATE TABLE Notes (
//     noteId varchar(36),
//     entryText TEXT,
//     postedBy int(10) references Users(id),
//     timePosted DATETIME,
//     timeModified DATETIME,
//     primary key (noteId)
// );

// Get all notes in a given group
exports.getNotesInGroup = (groupId, callback) => {

    const sql = `select Notes.noteId as noteId, Notes.entryText as entryText, Notes.timePosted as timePosted, Notes.timeModified as timeModified, Users.firstName as firstName, Users.lastName from Notes join NotesGroups on Notes.noteId LIKE NotesGroups.noteId join Users on Notes.postedBy = Users.userId where NotesGroups.groupId LIKE '${groupId}' ORDER BY timePosted DESC;`;
    dbFunctions.makeSqlQuery(sql, callback);
};

exports.getNotesByUser = (userId, callback) => {
    const sql = `SELECT * FROM Notes WHERE postedBy = ${userId} ORDER BY timePosted DESC`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Add a new note
exports.addNote = (userId, noteText, noteId, datetime, callback) => {
    noteText = dbFunctions.escapeString(noteText);

    // Add note for userId
    const sql1 = `INSERT INTO Notes VALUES ('${noteId}', '${noteText}', ${userId}, '${datetime}','${datetime}');`;
    const sql2 = `insert into NotesGroups values ('${noteId}', (select personalGroup from Users where userId = ${userId}), '${datetime}');`;
    const sql = sql1 + sql2;

    dbFunctions.makeSqlQuery(sql, callback);
};

// Add a new note
exports.addNoteToPersonalGroup = (userId, noteId, datetime, callback) => {
    //automatically share with personalGroup of user
    const sql2 = `insert into NotesGroups values ('${noteId}', (select personalGroup from Users where userId = ${userId}), '${datetime}')`;
    dbFunctions.makeSqlQuery(sql2, callback);
};

// Share note in group
// When you share a note in a group, you join that group
// IF you are not already in it.
exports.shareNoteInGroup = (noteId, groupId, userId, callback) => {

    const timeShared = new Date().toLocaleString();
    const sql1 = `INSERT INTO NotesGroups VALUES ('${noteId}', '${groupId}', '${timeShared}');`;
    // Join the group as well
    const sql2 = `INSERT INTO UsersGroups VALUES (${userId}, '${groupId}');`;
    const sql = sql1 + sql2;


    dbFunctions.makeSqlQuery(sql, callback);
};

// Edit a note
exports.editNote = (noteId, newText, callback) => {
    // timeModified will auto-update in DB
    let sql = `UPDATE Notes SET entryText = '${newText}' WHERE noteId LIKE '${noteId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Delete a note
exports.deleteNote = (noteId, callback) => {
    let sql = `DELETE FROM Notes WHERE noteId LIKE '${noteId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};
