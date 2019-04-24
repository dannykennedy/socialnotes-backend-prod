'use strict';

const express = require('express');
const router = express.Router();

// Every time we add a route, we import it here
const tagsRoute = require('./tags');
const notesRoute = require('./notes');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const commentsRoute = require('./comments');
const groupsRoute = require('./groups');
const usersRoute = require('./users');
const registerRoute = require('./register')

router.use('/login', loginRoute());
router.use('/notes', notesRoute());
router.use('/tags', tagsRoute());
router.use('/logout', logoutRoute());
router.use('/comments', commentsRoute());
router.use('/groups', groupsRoute());
router.use('/registerUser', registerRoute())
router.use('/', usersRoute());

module.exports = () => {
    return router;
};
