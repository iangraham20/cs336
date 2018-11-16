/* app.js implements the server for lab 8
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// enfore strict syntactical rules
"use_strict";

// import and instantiate an express application
const express = require('express');
const app = express();

// specify a host name and port number
const host = "localhost";
const port = 3000;

// require http status codes and the json bodyParser
const httpStatus = require('http-status-codes');
const bodyParser = require('body-parser');

//
var fs = require('fs');
var path = require('path');
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// create a static folder and notify the user that the application is running
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.port || 3000));

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
