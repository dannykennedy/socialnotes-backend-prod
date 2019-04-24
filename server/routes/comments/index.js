'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");
const dbGroupFunctions = require("../../database_functions/group_functions");
const dbCommentsFunctions = require("../../database_functions/comment_functions");
const cors = require('cors');

module.exports = () => {

    router.use(cors());

    router.get('/users/:userID', (req, resp, next) => {
        const uid = req.params.userID;

        dbCommentsFunctions.getCommentsByUser(uid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
     });

     router.get('/notes/:noteID', (req, resp, next) => {
        const nid = req.params.noteID;

        dbCommentsFunctions.getCommentsByNote(nid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
     });

     router.post('/', cors(), (req, res, next) => {
        let post = req.body;
        let postText = post.postText;
        let userId = post.userId;
        let noteId = post.noteId;
        console.log("THIS IS THE NOTEIDSSSSS" + noteId);

        dbCommentsFunctions.addComment(postText, userId, noteId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });
    return router;
   };
