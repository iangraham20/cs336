/* server.js implements the server for lab 10
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

// specify the static folder being used
app.use('/', express.static(__dirname + '/dist'));

// set a host name and port number
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));

// instantiate a bodyparser that parses url encoded json data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// import the mongodb library
var MongoClient = require('mongodb').MongoClient;

// use the connect method to connect to the server
MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client;
  // notify the user that the application is running
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// display the json data found in he comments collection
app.get('/api/comments', function(req, res) {
  db.collection('comments').find().toArray(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
});

// add a new comment to the collection
app.post('/api/comments', function(req, res) {
  db.collection('comments').insertOne({
    author: req.body.author,
    text: req.body.text,
  }, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  db.collection('comments').find().toArray(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
});
