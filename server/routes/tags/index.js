'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('this is ya tags');
    });

    router.get('/:noteId', (req, res, next) => {
        return res.send(`I'm going to send you the tags associated with ${req.params.noteId}`);
    });

    return router;
};