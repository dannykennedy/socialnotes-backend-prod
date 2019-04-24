'use strict';
const dbFunctions = require("./db_functions.js");

// CREATE TABLE Sharegroups (
//     groupId varchar(36),
//     groupName varchar(50),
//     lastActive DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     primary key (groupId)
// );


exports.getGroupById = (groupId, callback) => {
    //lastActive will be auto-updated
    const sql = `SELECT * FROM Sharegroups WHERE groupId = '${groupId}'`;
    dbFunctions.makeSqlQuery(sql, callback);
};

exports.getAllGroups = (callback) => {
    //lastActive will be auto-updated
    const sql = `SELECT * FROM Sharegroups`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Get personal group by userID
// exports.getPersonalGroupByUserId = (userId, callback) => {
//     //lastActive will be auto-updated
//     const sql = `SELECT * FROM Sharegroups WHERE groupId = '${groupId}'`;
//     dbFunctions.makeSqlQuery(sql, callback);
// };

// Create a new group
exports.createGroup = (groupId, groupName, userId, callback) => {

  console.log("in the db dunctions this fucking user id is " + userId);
    //lastActive will be auto-updated
    const sql1 = `INSERT INTO Sharegroups (groupId, groupName) VALUES ('${groupId}', '${groupName}');`;
    const sql2 = `INSERT INTO UsersGroups VALUES (${userId}, '${groupId}');`;
    const sql = sql1+sql2;



    dbFunctions.makeSqlQuery(sql, callback);
};

// Add a user to an existing group
exports.addUserToGroup = (userId, groupId, callback) => {
    const sql = `INSERT INTO UsersGroups VALUES (${userId}, '${groupId}');`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Change group name
exports.modifyGroupName = (groupName, groupId, callback) => {
    const sql = `UPDATE Sharegroups SET groupName = '${groupName}' WHERE groupId LIKE '${groupId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};

// Get all the groups that a given user is a member of
exports.getGroupsByUser = (userId, callback) => {
	//Select DISTINCT groupName FROM Sharegroups JOIN UsersGroups WHERE  userId = '1' ORDER BY Sharegroups.lastActive DESC;
	// const sql = `Select DISTINCT groupName, Sharegroups.groupId FROM Sharegroups JOIN UsersGroups WHERE UsersGroups.userId = '${userId}';`;
    const sql = `select UsersGroups.groupId, Sharegroups.groupName from UsersGroups JOIN Sharegroups on UsersGroups.groupId = Sharegroups.groupId WHERE userId = '${userId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};

exports.getListUserInGroup = (groupId, callback) => {
    //Select DISTINCT groupName FROM Sharegroups JOIN UsersGroups WHERE  userId = '1' ORDER BY Sharegroups.lastActive DESC;
    // const sql = `Select DISTINCT groupName, Sharegroups.groupId FROM Sharegroups JOIN UsersGroups WHERE UsersGroups.userId = '${userId}';`;
    const sql = `select Users.firstName, Users.lastName from UsersGroups JOIN Sharegroups on UsersGroups.groupId = Sharegroups.groupId JOIN Users on Users.userId = UsersGroups.userId WHERE Sharegroups.groupId = '${groupId}';`;
    dbFunctions.makeSqlQuery(sql, callback);
};
