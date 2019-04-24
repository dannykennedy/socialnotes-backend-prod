'use strict';

const express = require('express');
const router = express.Router();
const dbUserFunctions = require("../../database_functions/user_functions.js");
const cors = require('cors');
const bodyparser = require('body-parser');
const crypto = require('crypto');

module.exports = () => {

  router.use(cors());

  router.post('/', cors(), (req, res, next) => {
    console.log("register route hit!");
    let user = req.body;
    console.log("req body", user);
    var size = Object.values(user)
    for (var i=0; i<size.length; i++) {
      if (size[i] == '') {res.send(300, "Please fill out all forms")}
    }
    let fName = user.fName;
    let lName = user.lName;
    let email = user.email;
    let password = user.password;
    let username = user.userName;
    let passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    dbUserFunctions.registerUser(passwordHash, fName, lName, username, email, function (err, results) {
        if(err) { res.send(500,"Server Error"); return;}
        res.send(results);
    });
  });

  return router;
}
