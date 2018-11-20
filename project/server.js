/* server.js implements the server for the Meseum Project
 *
 * Authors: Ian Christensen, Derek Fisher, Cameron Dewey
 * Professor: Keith Vander Linden
 * Class: CS-336-A, Calvin College
 * Semester: Fall, 2018
 */

"use_strict";

// specify the static directory and server url
const express = require('express');
const app = express();
app.use('/', express.static(__dirname + '/dist'));
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));

// instantiate a bodyparser that parses url encoded json data
const httpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// import and connect to a mongoDB
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client;
  app.listen(app.get('port'), function() { console.log('Server started: http://' + app.get('host') + ':' + app.get('port') + '/'); });
});

// Middleware that sets the header for each request
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// display the json data found in the items collection
app.get('/api/items', function(req, res) {
  db.collection('items').find().toArray(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
})
.post('/api/items', function(req, res) {
  db.collection('comments').insertOne({
    item: req.body.item,
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
