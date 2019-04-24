'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");
const dbGroupFunctions = require("../../database_functions/group_functions");
const cors = require('cors');
const uuidv4 = require('uuid/v4');

module.exports = () => {

    router.use(cors());

    router.get('/', (req, resp, next) => {
      dbGroupFunctions.getAllGroups(function (err, results) {
          if(err) { resp.send(500,"Server Error"); return;}
          resp.send(results);
      });
    });

    // Get all notes in group
    router.get('/:groupId', (req, resp, next) => {
        const gid = req.params.groupId;

        dbNoteFunctions.getNotesInGroup(gid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    // Get details of a particular group
    router.get('/group/:groupId', (req, resp, next) => {
        const gid = req.params.groupId;

        dbGroupFunctions.getGroupById(gid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    // Get all groups that a given user is a member of
    router.get('/user/:userId', (req, resp, next) => {
        const uid = req.params.userId;

        dbGroupFunctions.getGroupsByUser(uid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    // List all the users in a particular group
     router.get('/:groupId/users', (req, resp, next) => {
        const gid = req.params.groupId;

        dbGroupFunctions.getListUserInGroup(gid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    // Create a new group
    // Body of request should look like this:
    // {
    //     "groupId": "161420ed-a009-44b6-95e6-11177ddc946e"
    //     "groupName": ""
    //     "userId" : ""
    // }
    router.post('/', cors(), (req, res, next) => {
        let post = req.body;
        let groupName = post.groupName;
        let userId = post.userId;
        const groupId = uuidv4();
        console.log("the group id is!!!! " + groupId);

        dbGroupFunctions.createGroup(groupId, groupName, userId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    // Add user to group
    // Body of request should look like this:
    // {
    //     "groupId": "161420ed-a009-44b6-95e6-11177ddc946e",
    //     "userId": 1
    // }
    router.post('/users', cors(), (req, res, next) => {
        let post = req.body;
        let groupId = post.groupId;
        let userId = post.userId;

        dbGroupFunctions.addUserToGroup(userId, groupId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    // Post note to group
    // Body of request should look like this:
    // {
    //     "groupId": "161420ed-a009-44b6-95e6-11177ddc946e",
    //     "noteId": "30799eee-4b98-4f2f-9f21-eb9e4464001f"
    //     "userId": "34534eee-4b98-4f2f-9f21-eb9e4464001f"
    // }
    router.post('/notes', cors(), (req, res, next) => {
        let shareRequest = req.body;
        let groupId = shareRequest.groupId;
        let noteId = shareRequest.noteId;
        let userId = shareRequest.userId;

        dbNoteFunctions.shareNoteInGroup(noteId, groupId, userId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    // Change name of group
    // Body of request should look like this:
    // {
    //     "groupId": "161420ed-a009-44b6-95e6-11177ddc946e",
    //     "groupName": "CS275"
    // }
    router.patch('/', cors(), (req, res, next) => {
        let update = req.body;
        let groupName = update.groupName;
        let groupId = update.groupId;

        dbGroupFunctions.modifyGroupName(groupName, groupId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    return router;
};
