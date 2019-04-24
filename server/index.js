'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8080;
const cors = require('cors');
// var path = require('path');
// var updater = require( path.resolve( __dirname, "./db.js" ) );

// Import the routes folder, which has our different routes in it
const routes = require('./routes');

// Express is listening on a port (8080, in our case).
// It first passes the request through the chain of middleware here
// (all these .use things)

//Express middleware, gets the folder where our public assets are
app.use(express.static('public')); //for static files
app.use(express.static('.'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/', routes()); //this uses the routes folder

// Listen for requests
app.listen(port,function(){
    console.log('Welcome to SocialNotes!');
    console.log('=======================');
    console.log('Server Started on port ' + port + "...");
});

// module.exports = {
//     app: app
// };
module.export = app;
