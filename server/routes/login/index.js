'use strict';

const express = require('express');
const dbUserFunctions = require("../../database_functions/user_functions.js");
const router = express.Router();
const crypto = require('crypto');
const cors = require('cors');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('This is the login page');
    });

    router.use(cors());

    router.post('/', (req, res, next) => {
        console.log("login route hit")
        let email = req.body.email
        let password = req.body.password
        let passwordHash = crypto.createHash('sha256').update(password).digest('hex');
        dbUserFunctions.loginUser(email, passwordHash, function (err, results) {
            if(err) { res.send(500,"Server Error"); return; }
            console.log("results ", results)
            if (results.length < 1) { res.send(300, "Invalid email/password") }
            else { res.send(results); }
            // res.send(results);
        });
    });

    return router;
};
