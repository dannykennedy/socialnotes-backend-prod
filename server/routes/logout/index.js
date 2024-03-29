'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('You are now logged out');
    });

    return router;
};