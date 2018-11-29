/* server.js implements the server for lab 13
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

"use_strict";

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const APP_PATH = path.join(__dirname, 'dist');
var db;
var data;

MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client.db('cs336');
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
})

app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
   db.collection('comments').find().toArray(function (err, result) {
    if (err) throw err
    data = result;
  });
  res.json(data);
});

app.post('/api/comments', function(req, res) {
    db.collection('comments').insertOne({id: Date.now(), author: req.body.author, text: req.body.text});
    db.collection('comments').find().toArray(function (err, result) {
    if (err) throw err
      data = result;
      console.log(result);
      res.json(result);
  }); 
});

app.get('/api/comments/:id', function(req, res) {
    db.collection('comments').find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/comments/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('comments').updateOne({ id: updateId }, { $set: update },
        function(err, result) {
            if (err) throw err;
        db.collection('comments').find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

app.delete('/api/comments/:id', function(req, res) {
    db.collection('comments').deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection('comments').find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.use('*', express.static(APP_PATH));
